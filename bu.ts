import { titleCase } from "./src/case";
import { value } from "./src/value";

export function build(name: string): string {
  return `${titleCase(name)}#${value}`;
}
