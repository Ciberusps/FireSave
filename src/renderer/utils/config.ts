type TVal = "RESOURCES_PATH" | "IS_DEV";

export const SENTRY_DSN =
  "https://3005bff882b441eda4689afb29ab3cae@o240795.ingest.sentry.io/5595121";

export const getVal = async (val: TVal): Promise<string | null> => {
  return (await window?.electron?.getConfig())?.[val] || null;
};
