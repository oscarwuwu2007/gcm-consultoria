function decide() {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  try {
    if (window.sessionStorage.getItem("gcm-intro")) return false
    window.sessionStorage.setItem("gcm-intro", "1")
  } catch {
    // sessionStorage can be blocked; play the intro anyway
  }
  return true
}

export const showIntro = decide()

if (typeof document !== "undefined") {
  document.documentElement.style.setProperty("--intro", showIntro ? "2.2s" : "0s")
}
