const SIMULATED_LATENCY_MS = 2000

export function simulateRequest(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))
}
