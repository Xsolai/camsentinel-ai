"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialIncidents } from "@/lib/mock-data";
import type { IncidentStatus, MockAppState, PricingPlan, UserProfile } from "@/lib/types";

const defaultState: MockAppState = {
  selectedSiteId: "north-hub",
  incidents: initialIncidents,
  subscription: { planId: "operations", cameraCount: 24, billing: "monthly", status: "trial" },
  profile: { name: "Ahsan Inam", email: "hello@xsol.ai", company: "XsolAI", timezone: "Asia/Karachi" },
  onboardingComplete: false,
};

interface StoreValue extends MockAppState {
  selectSite: (id: string) => void;
  updateIncidentStatus: (id: string, status: IncidentStatus) => void;
  selectPlan: (planId: PricingPlan["id"], cameraCount?: number) => void;
  setBilling: (billing: "monthly" | "annual") => void;
  completeOnboarding: () => void;
  updateProfile: (profile: UserProfile) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function MockStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MockAppState>(defaultState);

  useEffect(() => {
    const saved = window.localStorage.getItem("camsentinel-demo-state");
    let timer: number | undefined;
    if (saved) {
      try {
        const nextState = { ...defaultState, ...JSON.parse(saved) };
        timer = window.setTimeout(() => setState(nextState), 0);
      } catch { /* deterministic fallback */ }
    }
    return () => { if (timer !== undefined) window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("camsentinel-demo-state", JSON.stringify(state));
  }, [state]);

  const value = useMemo<StoreValue>(() => ({
    ...state,
    selectSite: (selectedSiteId) => setState((current) => ({ ...current, selectedSiteId })),
    updateIncidentStatus: (id, status) => setState((current) => ({ ...current, incidents: current.incidents.map((incident) => incident.id === id ? { ...incident, status } : incident) })),
    selectPlan: (planId, cameraCount) => setState((current) => ({ ...current, subscription: { ...current.subscription, planId, cameraCount: cameraCount ?? current.subscription.cameraCount } })),
    setBilling: (billing) => setState((current) => ({ ...current, subscription: { ...current.subscription, billing } })),
    completeOnboarding: () => setState((current) => ({ ...current, onboardingComplete: true })),
    updateProfile: (profile) => setState((current) => ({ ...current, profile })),
  }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useMockStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useMockStore must be used within MockStoreProvider");
  return context;
}
