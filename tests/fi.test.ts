import { expect, test } from "bun:test";
import { greet, greetMany } from "../fi";

test("greet uses defaults", () => {
  expect(greet("alice")).toBe("Hello, Alice!");
});

test("greet honours overrides", () => {
  expect(greet("bob", { salutation: "Hi", punctuation: "." })).toBe("Hi, Bob.");
});

test("greet rejects empty name", () => {
  expect(() => greet("  ")).toThrow();
});

test("greetMany maps over the list", () => {
  expect(greetMany(["alice", "bob"])).toEqual(["Hello, Alice!", "Hello, Bob!"]);
});
