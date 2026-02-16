/**
 * Form wrapper with bot protection using three security layers:
 * 1. Honeypot field (hidden, aria-hidden)
 * 2. Timing check (minimum 2.5 seconds before submission)
 * 3. Interaction detection (requires either pointer movement 10+ times OR keyboard input 3+ key presses, not both)
 *
 * Accessible for all users: keyboard-only, screen readers, motor disabilities, touch devices.
 * Server-side validation required for actual security (client-side can be bypassed).
 *
 * @param {Object} props
 * @param {JSX.Element} props.children - Form fields to render inside the form.
 * @param {Function} [props.onValidSubmit] - Callback fired when form passes all validation checks.
 * @param {boolean} [props.showCheckbox=false] - Whether to display the "I confirm I am human" checkbox.
 * @param {number} [props.minTime=2500] - Minimum milliseconds before form submission is allowed.
 * @param {string} [props.honeypotName="website"] - Name attribute for the hidden honeypot field.
 * @returns {JSX.Element}
 */

import { useRef, useEffect, useState } from "react";

import { useHumanCheck } from "../hooks/useHumancheck";
import HoneypotField from "./HoneypotField";

export default function HumanCheckForm({
  children,
  onValidSubmit,
  showCheckbox = false,
  minTime = 2500,
  honeypotName = "website",
}) {
  const formRef = useRef(null);
  const checkboxRef = useRef(null);
  const errorRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  const { error: hookError, validate, reset } = useHumanCheck({ minTime });

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!error) return;
    errorRef.current?.focus();
    errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (showCheckbox && !checked) {
      setError("Please confirm you're not a robot by checking the box.");
      checkboxRef.current?.focus();
      checkboxRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    const isValid = validate(form, honeypotName);
    if (!isValid) {
      setError(hookError);
      return;
    }

    setError(null);
    onValidSubmit?.(e);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={error ? "form-error" : undefined}
    >
      <HoneypotField name={honeypotName} />

      {children}

      {showCheckbox && (
        <div className="hc-checkbox">
          <label htmlFor="human-check">
            <input
              id="human-check"
              ref={checkboxRef}
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="hc-checkbox-input"
            />
            Tick this box if you're human!
          </label>
        </div>
      )}

      {error && (
        <div
          id="form-error"
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          className="hc-error"
          ref={errorRef}
        >
          Error: {error}
        </div>
      )}
    </form>
  );
}
