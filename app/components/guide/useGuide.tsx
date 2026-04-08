"use client";
import { useState, useEffect } from "react";

export function useGuide() {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  const nextStep = (newStep?: number) => {
    const s = newStep ?? step + 1;
    setStep(s);
    localStorage.setItem("guide-step", s.toString());
  };

  const skip = () => {
    setStep(-1);
    localStorage.removeItem("guide-step");
  };

  useEffect(() => {
    const savedStep = localStorage.getItem("guide-step");

    if (savedStep !== null) {
      setStep(Number(savedStep));
    }

    setReady(true);
  }, []);

  console.log("STEP:", step, "READY:", ready);

  return {
    step,
    nextStep,
    skip,
    ready,
  };
}