// biome-ignore assist/source/organizeImports: preserving import order for clarity
import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Helper hook to attach document event listeners with automatic cleanup.
 * @param {string} eventName - The event to listen for
 * @param {Function} handler - The event handler function
 */
const useDocumentEvent = (eventName, handler) => {
  useEffect(() => {
    document.addEventListener(eventName, handler);
    return () => document.removeEventListener(eventName, handler);
  }, [eventName, handler]);
};

/**
 * Custom hook that provides client-side bot detection for form validation.
 * 
 * Server-side validation required for actual security (client-side can be bypassed by high-level bots).
 * 
 * Detection layers:
 * 1. Interaction - Requires pointer movement (10+) OR keyboard input (3+ keys)
 * 2. Timing - Blocks submissions faster than minimum time threshold
 * 3. Honeypot - Validates hidden field remains empty
 * 
 * @param {Object} [options] - Configuration options
 * @param {number} [options.minTime=2500] - Minimum milliseconds required before form can be submitted
 * @returns {Object} Validation interface
 * @returns {string|null} returns.error - Current validation error message or null
 * @returns {Function} returns.validate - Validates form: validate(formElement, honeypotFieldName)
 * @returns {Function} returns.reset - Resets all tracking counters and errors
 * 
 * @example
 * const { error, validate, reset } = useHumanCheck({ minTime: 3000 });
 */
export function useHumanCheck({ minTime = 2500 } = {}) {
  const startTime = useRef(null);
  const pointerMoves = useRef(0);
  const keyPresses = useRef(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    startTime.current = Date.now();
  }, []);

  useDocumentEvent("pointermove", () => pointerMoves.current++);
  useDocumentEvent("keydown", () => keyPresses.current++);

  const setValidationError = useCallback((message) => {
    setError(message);
    return { valid: false, error: message };
  }, []);

  const validate = useCallback(
    (formElement, honeyTrap) => {
      const now = Date.now();
      if (now - startTime.current < minTime) {
        return setValidationError(
          "Form submitted too quickly. Please take your time.",
        );
      }

      const honeypot = formElement.elements[honeyTrap];
      if (honeypot?.value.trim()) {
        return setValidationError(
          "Bot detected. Please leave the honeypot field empty.",
        );
      }

      if (pointerMoves.current < 10 && keyPresses.current < 3) {
        return setValidationError(
          "Please interact with the form using your mouse/touch or " +
          "keyboard before submitting.",
        );
      }

      setError(null);
      return { valid: true, error: null };
    },
    [minTime, setValidationError],
  );

  const reset = useCallback(() => {
    startTime.current = Date.now();
    pointerMoves.current = 0;
    keyPresses.current = 0;
    setError(null);
  }, []);

  return { error, validate, reset };
}
