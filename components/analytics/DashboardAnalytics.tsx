"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function DashboardAnalytics() {
  useEffect(() => {
    trackEvent("dashboard_viewed", {
      dashboard_name: "sales_dashboard",
    });
  }, []);

  return null;
}