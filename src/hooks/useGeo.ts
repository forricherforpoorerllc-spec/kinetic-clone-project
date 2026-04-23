import { useEffect, useState } from "react";

export type Geo = {
  city: string;
  region: string;     // full state name e.g. "Texas"
  regionCode: string; // 2-letter e.g. "TX"
  postal: string;
  country: string;
  loading: boolean;
  error?: string;
};

const DEFAULT_GEO: Geo = {
  city: "",
  region: "",
  regionCode: "",
  postal: "",
  country: "US",
  loading: true,
};

const STORAGE_KEY = "kinetic_geo_v2";
const STORAGE_TTL_MS = 1000 * 60 * 60 * 6; // 6h — refresh more often for accuracy

type CachedGeo = { at: number; data: Omit<Geo, "loading"> };

function readCache(): Omit<Geo, "loading"> | null {
  try {
    const raw = typeof window !== "undefined" ? window.sessionStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedGeo;
    if (!parsed.data?.city || Date.now() - parsed.at > STORAGE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: Omit<Geo, "loading">) {
  try {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch { /* ignore */ }
}

// US state name → 2-letter code lookup (covers all 50 states + DC)
const STATE_CODES: Record<string, string> = {
  "Alabama":"AL","Alaska":"AK","Arizona":"AZ","Arkansas":"AR","California":"CA",
  "Colorado":"CO","Connecticut":"CT","Delaware":"DE","Florida":"FL","Georgia":"GA",
  "Hawaii":"HI","Idaho":"ID","Illinois":"IL","Indiana":"IN","Iowa":"IA","Kansas":"KS",
  "Kentucky":"KY","Louisiana":"LA","Maine":"ME","Maryland":"MD","Massachusetts":"MA",
  "Michigan":"MI","Minnesota":"MN","Mississippi":"MS","Missouri":"MO","Montana":"MT",
  "Nebraska":"NE","Nevada":"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM",
  "New York":"NY","North Carolina":"NC","North Dakota":"ND","Ohio":"OH","Oklahoma":"OK",
  "Oregon":"OR","Pennsylvania":"PA","Rhode Island":"RI","South Carolina":"SC",
  "South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Vermont":"VT",
  "Virginia":"VA","Washington":"WA","West Virginia":"WV","Wisconsin":"WI","Wyoming":"WY",
  "District of Columbia":"DC",
};

type RawGeo = Omit<Geo, "loading">;

/** Provider 1: ipapi.co — returns region_code directly */
async function fetchIpApiCo(signal: AbortSignal): Promise<RawGeo> {
  const res = await fetch("https://ipapi.co/json/", { signal });
  if (!res.ok) throw new Error(`ipapi.co ${res.status}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j: any = await res.json();
  if (j.error) throw new Error(`ipapi.co: ${j.reason}`);
  return {
    city: String(j.city || ""),
    region: String(j.region || ""),
    regionCode: String(j.region_code || ""),
    postal: String(j.postal || ""),
    country: String(j.country_code || "US"),
  };
}

/** Provider 2: ipinfo.io — free 50k/month, very reliable, maps region name to code */
async function fetchIpInfo(signal: AbortSignal): Promise<RawGeo> {
  const res = await fetch("https://ipinfo.io/json", { signal });
  if (!res.ok) throw new Error(`ipinfo.io ${res.status}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j: any = await res.json();
  const region = String(j.region || "");
  return {
    city: String(j.city || ""),
    region,
    regionCode: STATE_CODES[region] || String(j.region || "").slice(0, 2).toUpperCase(),
    postal: String(j.postal || ""),
    country: String(j.country || "US"),
  };
}

async function resolveGeo(): Promise<RawGeo> {
  const ac1 = new AbortController();
  const ac2 = new AbortController();
  const timeout = setTimeout(() => { ac1.abort(); ac2.abort(); }, 4000);
  try {
    // Try both providers in parallel, take the first to succeed with a city
    const result = await Promise.any([
      fetchIpApiCo(ac1.signal),
      fetchIpInfo(ac2.signal),
    ]);
    // Cancel the slower one
    ac1.abort(); ac2.abort();
    return result;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Real IP-based geolocation — fetches from the user's browser (not the server),
 * so it always reflects the visitor's actual public IP address.
 *
 * Tries ipapi.co and ipinfo.io in parallel, takes whichever responds first.
 * Results are cached in sessionStorage (6h TTL) to avoid repeat lookups on navigation.
 */
export function useGeo(): Geo {
  const [geo, setGeo] = useState<Geo>(() => {
    const cached = typeof window !== "undefined" ? readCache() : null;
    if (cached) return { ...cached, loading: false };
    return DEFAULT_GEO;
  });

  useEffect(() => {
    if (!geo.loading) return;
    let cancelled = false;

    resolveGeo()
      .then((data) => {
        if (cancelled) return;
        writeCache(data);
        setGeo({ ...data, loading: false });
      })
      .catch(() => {
        if (cancelled) return;
        setGeo({ ...DEFAULT_GEO, loading: false, error: "geo_failed" });
      });

    return () => { cancelled = true; };
  }, [geo.loading]);

  return geo;
}

/** Friendly display label — "Dallas, TX" or sane fallback */
export function locationLabel(geo: Geo, fallback = "your neighborhood"): string {
  if (geo.loading) return fallback;
  if (geo.city && geo.regionCode) return `${geo.city}, ${geo.regionCode}`;
  if (geo.city) return geo.city;
  if (geo.region) return geo.region;
  return fallback;
}

