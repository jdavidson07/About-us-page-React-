import { describe, it, expect } from "vitest";
import { isCrisisText } from "./MilestoneTracker.jsx";

describe("isCrisisText", () => {
  it("flags genuine crisis language", () => {
    expect(isCrisisText("I want to die")).toBe(true);
    expect(isCrisisText("I'm going to hurt myself")).toBe(true);
    expect(isCrisisText("thinking about self-harm")).toBe(true);
  });

  it("ignores letter case and extra whitespace", () => {
    expect(isCrisisText("I feel   HOPELESS")).toBe(true);
    expect(isCrisisText("SUICIDE")).toBe(true);
  });

  it("does not flag keywords inside other words", () => {
    expect(isCrisisText("I studied for six hours")).toBe(false);
    expect(isCrisisText("I started a new diet")).toBe(false);
  });

  it("does not flag positive messages that contain 'help'", () => {
    expect(isCrisisText("This really helped me")).toBe(false);
  });

  it("does not flag ordinary messages", () => {
    expect(isCrisisText("I went for a walk and felt better")).toBe(false);
    expect(isCrisisText("")).toBe(false);
  });
});