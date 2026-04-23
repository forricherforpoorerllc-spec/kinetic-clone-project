import { createContext, useContext, useState, type ReactNode } from "react";

type OrderContextValue = {
  open: boolean;
  selectedPlan: string;
  openModal: (plan?: string) => void;
  closeModal: () => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Fiber 1 Gig — $49.99/mo");

  const openModal = (plan?: string) => {
    if (plan) setSelectedPlan(plan);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  return (
    <OrderContext.Provider value={{ open, selectedPlan, openModal, closeModal }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
