"use client";

import { useState, useEffect } from "react";

export function useGuide() {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const skip = () => setStep(-1);

  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, [step]);

  return {
    step,
    nextStep,
    skip,
    ready,
  };
}