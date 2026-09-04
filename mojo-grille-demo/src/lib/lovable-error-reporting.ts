export function reportLovableError(error: unknown, context?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.console) {
    console.error("[Lovable Error Reporter]", error, context);
  }
}
