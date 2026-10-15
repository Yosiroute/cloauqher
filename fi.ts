import { normalizeName, titleCase } from "./src/case";

export interface GreetOptions {
  readonly salutation?: string;
  readonly punctuation?: string;
}

const DEFAULT_SALUTATION = "Hello";
const DEFAULT_PUNCTUATION = "!";

export function greet(name: string, opts: GreetOptions = {}): string {
  const salutation = opts.salutation ?? DEFAULT_SALUTATION;
  const punctuation = opts.punctuation ?? DEFAULT_PUNCTUATION;
  const cleaned = normalizeName(name);
  if (!cleaned) throw new Error("name is required");
  return `${salutation}, ${titleCase(cleaned)}${punctuation}`;
}

export function greetMany(names: readonly string[], opts: GreetOptions = {}): string[] {
  return names.map((n) => greet(n, opts));
}
