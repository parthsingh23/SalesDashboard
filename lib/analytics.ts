"use client";

import { sendGAEvent } from "@next/third-parties/google";

type AnalyticsEvent =
  | "dashboard_viewed"
  | "filter_changed"
  | "export_clicked";

type AnalyticsParams = Record<string, string | number>;

export function trackEvent(
  event: AnalyticsEvent,
  params: AnalyticsParams = {},
) {
  sendGAEvent("event", event, params);
}