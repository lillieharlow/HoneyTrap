/**
 * Hook that provides form validation to detect and prevent bot submissions.
 * IMPORTANT: This is client-side protection only. Server-side validation is required for actual security.
 *
 * Validates form submissions using three invisible layers:
 * 1. Interaction detection - requires EITHER pointer movement (10+) OR keyboard input (3+ keys), not both
 * 2. Timing check - prevents submissions under 2.5 seconds
 * 3. Honeypot field - detects if hidden field was filled
 *
 * @param {Object} options
 * @param {number} [options.minTime=2500] - Minimum milliseconds before form submission is allowed.
 * @returns {Object} { error, validate(formElement, honeyTrap), reset() }
 */

import { useRef, useCallback, useState, useEffect } from "react";

export function useHumanCheck({ minTime = 2500 } = {}) {
  const startTime = useRef(null);
  const pointerMoves = useRef(0);
  const keyPresses = useRef(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    startTime.current = Date.now();
  }, []);

  useEffect(() => {
    const trackPointer = () => pointerMoves.current++;
    document.addEventListener("pointermove", trackPointer);
    return () => document.removeEventListener("pointermove", trackPointer);
  }, []);

  useEffect(() => {
    const trackKeyboard = () => keyPresses.current++;
    document.addEventListener("keydown", trackKeyboard);
    return () => document.removeEventListener("keydown", trackKeyboard);
  }, []);

  const validate = useCallback(
    (formElement, honeyTrap) => {
      const now = Date.now();

      if (now - startTime.current < minTime) {
        setError("Form submitted too quickly. Please take your time.");
        return false;
      }

      const honeypot = formElement.elements[honeyTrap];
      if (honeypot?.value.trim()) {
        setError("Bot detected. Please leave the honeypot field empty.");
        return false;
      }

      if (pointerMoves.current < 10 && keyPresses.current < 3) {
        setError(
          "Please interact with the form using your mouse/touch or keyboard before submitting.",
        );
        return false;
      }

      setError(null);
      return true;
    },
    [minTime],
  );

  const reset = useCallback(() => {
    startTime.current = Date.now();
    pointerMoves.current = 0;
    keyPresses.current = 0;
    setError(null);
  }, []);

  return { error, validate, reset };
}
