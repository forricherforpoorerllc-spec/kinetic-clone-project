import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrder } from "./OrderContext";
import { useGeo } from "@/hooks/useGeo";
import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  ShieldCheck,
  Lock,
  MapPin,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

// Paste your Google Apps Script Web App URL here:
const ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbwKSw41_zq_jxO5o1pZNSEUh1Hkog9LFF94thPQUYXfBkdWCEF9eECpf0_yURtS1eHC/exec";

const PLAN_OPTIONS = [
  { value: "Fiber 100 Mbps — $24.99/mo", speed: "100 Mbps", name: "Fiber 100", price: "$24.99/mo", badge: null },
  { value: "Fiber 300 Mbps — $39.99/mo", speed: "300 Mbps", name: "Fiber 300", price: "$39.99/mo", badge: "Popular" },
  { value: "Fiber 1 Gig — $49.99/mo", speed: "1 Gig", name: "Fiber 1 Gig", price: "$49.99/mo", badge: "Best Value" },
  { value: "Fiber 2 Gig — $69.99/mo", speed: "2 Gig", name: "Fiber 2 Gig", price: "$69.99/mo", badge: null },
  { value: "Fiber Max 2 Gig — $89.99/mo", speed: "2 Gig Max", name: "Fiber Max", price: "$89.99/mo", badge: "Fastest" },
  { value: "Internet + Voice Bundle — $49.99/mo", speed: "Bundle", name: "Internet + Voice", price: "$49.99/mo", badge: null },
];

const ADD_ONS = [
  "Whole Home Wi-Fi (free)",
  "Kinetic Secure Plus",
  "Home Phone (+$25/mo)",
  "Premium Tech Support",
  "Wi-Fi Extender",
];

const INSTALL_TIMES = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
];

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

const orderSchema = z.object({
  firstName: z.string().trim().min(1, "First name required").max(50),
  lastName: z.string().trim().min(1, "Last name required").max(50),
  streetAddress: z.string().trim().min(1, "Street address required").max(120),
  aptUnit: z.string().trim().max(20).optional(),
  city: z.string().trim().min(1, "City required").max(60),
  state: z.string().trim().min(2, "State required").max(2),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Valid ZIP required"),
  phone: z.string().trim().regex(/^[\d\s\-()+]{10,20}$/, "Valid phone required"),
  email: z.string().trim().email("Valid email required").max(255),
  dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Use MM/DD/YYYY format"),
  ssn: z.string().trim().regex(/^\d{3}-?\d{2}-?\d{4}$/, "Valid 9-digit SSN required"),
  plan: z.string().min(1, "Please select a plan"),
  preferredInstallDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Install date required"),
  preferredInstallTime: z.string().optional(),
});

type FormErrors = Record<string, string>;

export function OrderModal() {
  const { open, closeModal, selectedPlan } = useOrder();
  const geo = useGeo();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [planValue, setPlanValue] = useState(selectedPlan || "");
  const [addOnsOpen, setAddOnsOpen] = useState(false);
  const [addOns, setAddOns] = useState<string[]>(["Whole Home Wi-Fi (free)"]);
  const [movedInLastYear, setMovedInLastYear] = useState(false);
  const [ssnFocused, setSsnFocused] = useState(false);
  const [installTime, setInstallTime] = useState("");

  // Sync plan when modal opens with a pre-selected plan.
  useEffect(() => {
    if (open && selectedPlan) setPlanValue(selectedPlan);
  }, [open, selectedPlan]);

  // Prefill city/zip from geo once, when modal opens.
  useEffect(() => {
    if (!open || geo.loading) return;
    const cityEl = document.getElementById("city") as HTMLInputElement | null;
    const zipEl = document.getElementById("zip") as HTMLInputElement | null;
    if (cityEl && !cityEl.value && geo.city) cityEl.value = geo.city;
    if (zipEl && !zipEl.value && geo.postal) zipEl.value = geo.postal;
  }, [open, geo]);

  const defaultState = useMemo(() => {
    if (geo.regionCode && STATES.includes(geo.regionCode)) return geo.regionCode;
    return undefined;
  }, [geo.regionCode]);

  const formatDOB = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const formatSSN = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  };

  const formatPhone = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 10);
    if (digits.length < 4) return digits;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const toggleAddOn = (a: string) => {
    setAddOns((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  };

  const submitToEndpoint = async (payload: Record<string, unknown>) => {
    if (!ORDER_ENDPOINT || ORDER_ENDPOINT.includes("YOUR_SCRIPT_ID")) {
      // Dev fallback — simulate latency so UX still flows.
      await new Promise((r) => setTimeout(r, 900));
      return;
    }
    // Apps Script web apps work best with a "simple" request (no preflight).
    // Sending text/plain with a JSON string avoids CORS preflight.
    await fetch(ORDER_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    data.preferredInstallTime = installTime;

    const result = orderSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setSubmitting(true);

    const payload = {
      submittedAt: new Date().toISOString(),
      plan: result.data.plan,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      dob: result.data.dob,
      ssn: result.data.ssn,
      streetAddress: result.data.streetAddress,
      aptUnit: result.data.aptUnit || "",
      city: result.data.city,
      state: result.data.state,
      zip: result.data.zip,
      phone: result.data.phone,
      email: result.data.email,
      preferredInstallDate: result.data.preferredInstallDate,
      preferredInstallTime: installTime,
      addOns: addOns.join(", "),
      movedInLastYear,
      previousStreetAddress: movedInLastYear ? data.previousStreetAddress || "" : "",
      previousAptUnit: movedInLastYear ? data.previousAptUnit || "" : "",
      previousCity: movedInLastYear ? data.previousCity || "" : "",
      previousState: movedInLastYear ? data.previousState || "" : "",
      previousZip: movedInLastYear ? data.previousZip || "" : "",
      source: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    try {
      await submitToEndpoint(payload);
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Order received — a specialist will call to confirm.");
    } catch (err) {
      setSubmitting(false);
      toast.error("We couldn't submit right now. Please try again or contact us.");
      // eslint-disable-next-line no-console
      console.error("Order submission failed", err);
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setSubmitted(false);
      setErrors({});
      setPlanValue(selectedPlan || "");
      setAddOnsOpen(false);
      setAddOns(["Whole Home Wi-Fi (free)"]);
      setMovedInLastYear(false);
      setInstallTime("");
    }, 300);
  };

  const minInstall = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0">
        {submitted ? (
          <div className="px-8 py-14 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16" style={{ color: "var(--k-green)" }} />
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Order received!</h3>
            <p className="mt-2 text-muted-foreground">
              Thank you for choosing Kinetic. A fiber specialist will call soon to confirm your
              install{geo.city ? ` in ${geo.city}` : ""}.
            </p>
            <Button
              onClick={handleClose}
              className="mt-6 h-11 px-8 font-extrabold text-[var(--k-navy)] hover:opacity-90"
              style={{ background: "var(--k-yellow)" }}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            {/* Header bar */}
            <div
              className="rounded-t-lg px-6 py-5 text-white"
              style={{ background: "linear-gradient(135deg, var(--k-navy) 0%, var(--k-blue) 100%)" }}
            >
              <DialogHeader className="space-y-1 text-left">
                <DialogTitle className="font-display text-2xl text-white">
                  Lock in your Kinetic Fiber offer
                </DialogTitle>
                <DialogDescription className="text-white/85">
                  {geo.city ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" style={{ color: "var(--k-yellow)" }} />
                      Pricing shown for <strong className="font-bold">{geo.city}{geo.regionCode ? `, ${geo.regionCode}` : ""}</strong> · No contracts, no data caps.
                    </span>
                  ) : (
                    <>Complete your order in under 2 minutes. No annual contracts, no data caps.</>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/90">
                <span className="inline-flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" /> 256-bit SSL encrypted
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> No hidden fees
                </span>
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--k-yellow)" }} /> Up to $300 Mastercard®
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 bg-white px-6 pb-6 pt-5">
              {/* PLAN CARDS */}
              <div>
                <Label className="text-sm font-semibold text-slate-900">Choose Your Plan *</Label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {PLAN_OPTIONS.map((p) => {
                    const isSelected = planValue === p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPlanValue(p.value)}
                        className={`relative flex flex-col rounded-xl border-2 p-3 text-left transition-all focus:outline-none ${
                          isSelected
                            ? "border-[var(--k-blue)] bg-[var(--k-blue)]/5 shadow-md"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                        }`}
                      >
                        {p.badge && (
                          <span
                            className="absolute -top-2.5 right-3 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white"
                            style={{ background: "var(--k-blue)" }}
                          >
                            {p.badge}
                          </span>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{p.speed}</span>
                        <span className="mt-0.5 text-sm font-bold text-slate-900 leading-tight">{p.name}</span>
                        <span className="mt-1.5 text-base font-black" style={{ color: "var(--k-blue)" }}>{p.price}</span>
                        {isSelected && (
                          <CheckCircle2 className="absolute right-2 top-2 h-4 w-4" style={{ color: "var(--k-blue)" }} />
                        )}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="plan" value={planValue} />
                {errors.plan && <p className="mt-1 text-xs text-destructive">{errors.plan}</p>}
              </div>

              {/* ADD-ONS (collapsed, right below plan) */}
              <div>
                <button
                  type="button"
                  onClick={() => setAddOnsOpen((o) => !o)}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <span>Add-Ons <span className="font-normal text-slate-500">(optional)</span></span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${addOnsOpen ? "rotate-180" : ""}`} />
                </button>
                {addOnsOpen && (
                  <div className="mt-1.5 grid grid-cols-1 gap-1.5 rounded-lg border border-border bg-muted/40 p-3 sm:grid-cols-2">
                    {ADD_ONS.map((a) => {
                      const id = `addon-${a}`;
                      const checked = addOns.includes(a);
                      return (
                        <label
                          key={a}
                          htmlFor={id}
                          className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                            checked
                              ? "border-[var(--k-blue)] bg-[var(--k-blue)]/5 text-slate-900"
                              : "border-transparent text-slate-600 hover:bg-background"
                          }`}
                        >
                          <Checkbox id={id} checked={checked} onCheckedChange={() => toggleAddOn(a)} />
                          <span>{a}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* NAME */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="First Name" name="firstName" error={errors.firstName} autoComplete="given-name" required />
                <Field label="Last Name" name="lastName" error={errors.lastName} autoComplete="family-name" required />
              </div>

              {/* ADDRESS */}
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-3">
                  <Field label="Street Address" name="streetAddress" error={errors.streetAddress} autoComplete="street-address" required />
                </div>
                <div className="col-span-1">
                  <Field label="Apt / Unit" name="aptUnit" error={errors.aptUnit} autoComplete="address-line2" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2">
                  <Field label="City" name="city" error={errors.city} autoComplete="address-level2" required />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="state" className="text-sm font-semibold text-slate-900">State *</Label>
                  <Select name="state" defaultValue={defaultState}>
                    <SelectTrigger className="mt-1 border-border bg-white text-slate-900">
                      <SelectValue placeholder="ST" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-border shadow-xl z-[200]">
                      {STATES.map((s) => (
                        <SelectItem key={s} value={s} className="text-gray-900 focus:bg-[var(--k-blue)] focus:text-white cursor-pointer">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="mt-1 text-xs text-destructive">{errors.state}</p>}
                </div>
                <div className="col-span-1">
                  <Field label="ZIP Code" name="zip" error={errors.zip} autoComplete="postal-code" required maxLength={10} />
                </div>
              </div>

              {/* CONTACT */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="mt-1"
                    onChange={(e) => { e.target.value = formatPhone(e.target.value); }}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>
                <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" required />
              </div>

              {/* INSTALL DATE + INSTALL TIME */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Preferred Install Date"
                  name="preferredInstallDate"
                  type="date"
                  error={errors.preferredInstallDate}
                  required
                  min={minInstall}
                />
                <div>
                  <Label className="text-sm font-semibold text-slate-900">Preferred Time</Label>
                  <Select value={installTime} onValueChange={setInstallTime}>
                    <SelectTrigger className="mt-1 border-border bg-white text-slate-900">
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-border shadow-xl z-[200]">
                      {INSTALL_TIMES.map((t) => (
                        <SelectItem key={t} value={t} className="text-gray-900 focus:bg-[var(--k-blue)] focus:text-white cursor-pointer">{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* MOVED IN LAST YEAR */}
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
                  <Checkbox
                    checked={movedInLastYear}
                    onCheckedChange={(v) => setMovedInLastYear(v === true)}
                  />
                  <span>I've moved in the last 12 months</span>
                </label>
                {movedInLastYear && (
                  <div className="mt-3 space-y-3 border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground">
                      Providing your previous address helps verify service history faster.
                    </p>
                    <Field label="Previous Street Address" name="previousStreetAddress" />
                    <div className="grid grid-cols-4 gap-3">
                      <div className="col-span-1">
                        <Field label="Apt/Unit" name="previousAptUnit" />
                      </div>
                      <div className="col-span-2">
                        <Field label="City" name="previousCity" />
                      </div>
                      <div className="col-span-1">
                        <Label htmlFor="previousState" className="text-sm font-semibold text-slate-900">State</Label>
                        <Select name="previousState">
                          <SelectTrigger className="mt-1 border-border bg-white text-slate-900">
                            <SelectValue placeholder="ST" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-border shadow-xl z-[200]">
                            {STATES.map((s) => (
                              <SelectItem key={s} value={s} className="text-gray-900 focus:bg-[var(--k-blue)] focus:text-white cursor-pointer">{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Field label="Previous ZIP" name="previousZip" maxLength={10} />
                  </div>
                )}
              </div>

              {/* IDENTITY VERIFICATION BLOCK */}
              <div
                className={`rounded-xl border-2 transition-all ${
                  ssnFocused
                    ? "border-[var(--k-green)] shadow-[0_0_0_4px_rgba(38,177,112,0.15)]"
                    : "border-slate-200"
                }`}
              >
                {/* Block header */}
                <div
                  className="flex items-center justify-between gap-3 rounded-t-xl px-4 py-3"
                  style={{ background: "linear-gradient(135deg, var(--k-navy) 0%, #0e1a5c 100%)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                      <UserCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold uppercase tracking-wide text-white">
                        Identity Verification
                      </div>
                      <div className="text-[11px] text-white/70">
                        Required for fiber service activation
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-[var(--k-green)]/20 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--k-green)] animate-pulse" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--k-green)]">Encrypted</span>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50">
                  {[
                    { icon: Lock, label: "256-bit SSL" },
                    { icon: ShieldCheck, label: "Soft check only" },
                    { icon: UserCheck, label: "No score impact" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1 py-2.5 px-2">
                      <Icon className="h-4 w-4" style={{ color: "var(--k-navy)" }} />
                      <span className="text-[10px] font-semibold text-slate-600 text-center leading-tight">{label}</span>
                    </div>
                  ))}
                </div>

                {/* DOB + SSN inputs */}
                <div className="grid grid-cols-2 gap-4 px-4 py-4 bg-white rounded-b-xl">
                  {/* DOB — left */}
                  <div>
                    <Label htmlFor="dob" className="text-sm font-semibold text-slate-900">Date of Birth *</Label>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">MM/DD/YYYY</p>
                    <Input
                      id="dob"
                      name="dob"
                      type="text"
                      inputMode="numeric"
                      autoComplete="bday"
                      placeholder="MM/DD/YYYY"
                      maxLength={10}
                      required
                      className="mt-1 bg-white text-gray-900 border-slate-300"
                      onChange={(e) => { e.target.value = formatDOB(e.target.value); }}
                    />
                    {errors.dob && <p className="mt-1 text-xs text-destructive">{errors.dob}</p>}
                  </div>
                  {/* SSN — right */}
                  <div>
                    <Label htmlFor="ssn" className="text-sm font-semibold text-slate-900">Social Security Number *</Label>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">Never stored on this device</p>
                    <div className="relative mt-1">
                      <Input
                        id="ssn"
                        name="ssn"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="XXX-XX-XXXX"
                        maxLength={11}
                        required
                        onFocus={() => setSsnFocused(true)}
                        onBlur={() => setSsnFocused(false)}
                        onChange={(e) => { e.target.value = formatSSN(e.target.value); }}
                        className="pl-9 pr-9 font-mono tracking-[0.2em] text-base border-slate-300 bg-white text-gray-900"
                      />
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <ShieldCheck
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                        style={{ color: ssnFocused ? "var(--k-green)" : "#94a3b8" }}
                      />
                    </div>
                    {errors.ssn && <p className="mt-1 text-xs text-destructive">{errors.ssn}</p>}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="h-12 w-full text-base font-extrabold text-[var(--k-navy)] hover:opacity-90"
                style={{ background: "var(--k-yellow)" }}
              >
                {submitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</>
                ) : (
                  "Lock in my Kinetic Fiber plan"
                )}
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                By submitting you agree to be contacted about service at the number and email provided.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  min?: string;
  autoComplete?: string;
};

function Field({ label, name, type = "text", error, required, ...rest }: FieldProps) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm font-semibold text-slate-900">{label}{required && " *"}</Label>
      <Input id={name} name={name} type={type} required={required} className="mt-1 bg-white text-gray-900 border-slate-300" {...rest} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
