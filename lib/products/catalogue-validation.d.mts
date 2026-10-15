export declare function validateCatalogue(
  records: unknown,
  options?: { label?: string; rootDir?: string; approvedOnly?: boolean }
): string[];
export declare function assertProductionSafe(
  records: unknown,
  options?: { mode?: string }
): void;
