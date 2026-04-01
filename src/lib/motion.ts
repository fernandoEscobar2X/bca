export const plateSpring = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.9,
} as const;

export const revealUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: plateSpring,
} as const;
