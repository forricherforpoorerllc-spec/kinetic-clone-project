import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOrder } from "./OrderContext";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const PLANS = [
  "Fiber 100 Mbps — $24.99/mo",
  "Fiber 300 Mbps — $39.99/mo",
  "Fiber 1 Gig — $49.99/mo",
  "Fiber 2 Gig — $79.99/mo",
  "Internet + Voice Bundle — $49.99/mo",
];

const orderSchema = z.object({
  firstName: z.string().trim().min(1, "First name required").max(50),
  lastName: z.string().trim().min(1, "Last name required").max(50),
  street: z.string().trim().min(1, "Street address required").max(120),
  unit: z.string().trim().max(20).optional(),
  city: z.string().trim().min(1, "City required").max(60),
  state: z.string().trim().min(2, "State required").max(2),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Valid ZIP required"),
  phone: z.string().trim().regex(/^[\d\s\-()+]{10,20}$/, "Valid phone required"),
  email: z.string().trim().email("Valid email required").max(255),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth required"),
  ssn: z.string().trim().regex(/^\d{3}-?\d{2}-?\d{4}$/, "Valid 9-digit SSN required"),
  plan: z.string().min(1, "Please select a plan"),
  installDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Install date required"),
});

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

export function OrderModal() {
  const { open, closeModal, selectedPlan } = useOrder();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatSSN = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const result = orderSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Order received! A specialist will call to confirm.");
    }, 1200);
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setSubmitted(false);
      setErrors({});
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-12 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-kinetic-green" />
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Order received!</h3>
            <p className="mt-2 text-muted-foreground">
              Thank you for choosing Kinetic. A fiber specialist will call you within 1 business day to confirm your install.
            </p>
            <Button onClick={handleClose} className="mt-6 bg-kinetic-blue hover:bg-kinetic-blue/90">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-kinetic-blue">Order Kinetic Fiber Internet</DialogTitle>
              <DialogDescription>
                Complete your order in under 2 minutes. No annual contracts, no data caps.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First Name" name="firstName" error={errors.firstName} required />
                <Field label="Last Name" name="lastName" error={errors.lastName} required />
              </div>
              <Field label="Street Address" name="street" error={errors.street} required />
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <Field label="Apt/Unit" name="unit" error={errors.unit} />
                </div>
                <div className="col-span-2">
                  <Field label="City" name="city" error={errors.city} required />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="state" className="text-sm font-medium">State *</Label>
                  <Select name="state">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="ST" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="mt-1 text-xs text-destructive">{errors.state}</p>}
                </div>
              </div>
              <Field label="ZIP Code" name="zip" error={errors.zip} required maxLength={10} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Phone" name="phone" type="tel" error={errors.phone} required />
                <Field label="Email" name="email" type="email" error={errors.email} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date of Birth" name="dob" type="date" error={errors.dob} required />
                <div>
                  <Label htmlFor="ssn" className="text-sm font-medium">Social Security Number *</Label>
                  <Input
                    id="ssn"
                    name="ssn"
                    placeholder="XXX-XX-XXXX"
                    maxLength={11}
                    required
                    onChange={(e) => { e.target.value = formatSSN(e.target.value); }}
                    className="mt-1"
                  />
                  {errors.ssn && <p className="mt-1 text-xs text-destructive">{errors.ssn}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="plan" className="text-sm font-medium">Plan *</Label>
                <Select name="plan" defaultValue={selectedPlan}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLANS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.plan && <p className="mt-1 text-xs text-destructive">{errors.plan}</p>}
              </div>
              <Field label="Preferred Install Date" name="installDate" type="date" error={errors.installDate} required min={new Date(Date.now()+86400000).toISOString().split("T")[0]} />

              <div className="flex items-start gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-kinetic-green" />
                <span>Your information is encrypted and used only for credit verification and service activation.</span>
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-kinetic-blue text-white hover:bg-kinetic-blue/90 h-12 text-base font-semibold">
                {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Submit My Order"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, name, type = "text", error, required, ...rest }: { label: string; name: string; type?: string; error?: string; required?: boolean; maxLength?: number; min?: string; }) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm font-medium">{label}{required && " *"}</Label>
      <Input id={name} name={name} type={type} required={required} className="mt-1" {...rest} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
