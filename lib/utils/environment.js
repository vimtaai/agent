export const Environment = {
  BROWSER: "browser",
  NODE: "node",
  WEBWORKER: "webworker",
  UNKNOWN: "unknown",
};

export const currentEnvironment = getEnvironment();

function getEnvironment() {
  if (typeof window !== "undefined") {
    return Environment.BROWSER;
  }

  if (typeof self !== "undefined") {
    return Environment.WEBWORKER;
  }

  if (typeof process !== "undefined") {
    return Environment.NODE;
  }

  return Environment.UNKNOWN;
}
