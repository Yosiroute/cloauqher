export function normalizeName(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

export function titleCase(input: string): string {
  return normalizeName(input)
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}
