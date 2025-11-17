import confetti from "canvas-confetti";

export function showConfetti() {
  confetti({
    spread: 120,
    ticks: 200,
    origin: { y: 1 },
  });
}
