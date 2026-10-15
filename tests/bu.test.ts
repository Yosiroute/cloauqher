import { expect, test } from "bun:test";
import { build } from "../bu";

test("build composes title-cased name with value", () => {
  expect(build("alice smith")).toBe("Alice Smith#1");
});

test("build normalizes whitespace", () => {
  expect(build("  bob   jones ")).toBe("Bob Jones#1");
});
