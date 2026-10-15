export type CatalogueMode = "preview" | "live";
export declare function resolveCatalogueMode(
  configuredMode: string | undefined,
  nodeEnv: string | undefined,
  releaseMode?: boolean
): CatalogueMode;
