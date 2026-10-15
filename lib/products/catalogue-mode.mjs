export function resolveCatalogueMode(configuredMode, nodeEnv, releaseMode = false) {
  const mode = configuredMode ?? (nodeEnv === "production" ? "live" : "preview");
  if (mode !== "preview" && mode !== "live") {
    throw new Error('KROVINOX_CATALOGUE_MODE must be "preview" or "live".');
  }
  if (releaseMode && mode !== "live") {
    throw new Error("A release build cannot use preview catalogue mode.");
  }
  return mode;
}
