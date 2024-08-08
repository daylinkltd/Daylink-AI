export function getSelectedModel(): string {
  if (typeof window !== "undefined") {
    const storedModel = localStorage.getItem("selectedModel");
    return storedModel || "daylink_ai";
  } else {
    // Default model
    return "daylink_ai";
  }
}
