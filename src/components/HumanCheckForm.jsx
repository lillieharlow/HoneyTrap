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
 * @param {number} [props.minTime=2500] - Minimum milliseconds before form submission is allowed.
 * @param {string} [props.honeypotName="website"] - Name attribute for the hidden honeypot field.
 * @returns {JSX.Element}
 */

import { useRef, useEffect, useState } from "react";

import { useHumanCheck } from "../hooks/useHumanCheck";
import HoneypotField from "./HoneypotField";

export default function HumanCheckForm({
  children,
  onValidSubmit,
  minTime = 2500,
  honeypotName = "website",
}) {
  const formRef = useRef(null);
  const errorRef = useRef(null);
  const [error, setError] = useState(null);
  const { validate, reset } = useHumanCheck({ minTime });

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

    const result = validate(form, honeypotName);
    if (!result.valid) {
      setError(result.error);
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