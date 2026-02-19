/**
 * Main application component demonstrating HoneyTrap bot protection.
 * Displays a form with email and message fields protected by three invisible bot protection layers:
 * 1. Honeypot field (hidden, catches bots that auto-fill)
 * 2. Timing check (prevents instant submissions)
 * 3. Interaction detection (requires pointer movement OR keyboard input)
 *
 * Shows success screen after user passes all validation checks.
 *
 * @component
 * @returns {JSX.Element} Form or success view depending on submission state
 */

import { useState } from "react";

import HumanCheckForm from "./components/HumanCheckForm";
import FormField from "./components/FormField";
import "./index.css";

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleValidSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Human approved:", data);
    setSubmitted(true);
    alert("Passed all accessibility-safe checks!");
  };

  if (submitted) {
    return (
      <main className="app-success">
        <h1 className="app-success-title">SUCCESS</h1>
        <p>Your form passed all bot checks!</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="app-button app-button--success"
        >
          Test Again
        </button>
      </main>
    );
  }

  return (
    <main className="app-container">
      <h1 className="app-title">HoneyTrap</h1>
      <p>
        <strong>CAPTCHA-free</strong> accessibility-first form protection using
        three invisible layers
      </p>

      <HumanCheckForm onValidSubmit={handleValidSubmit}>
        <fieldset>
          <legend>Contact Form</legend>
          <FormField id="email" label="Email">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="form-input"
            />
          </FormField>

          <FormField id="message" label="Message">
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="form-textarea"
              aria-multiline="true"
            />
          </FormField>
        </fieldset>

        <button type="submit" className="app-button app-button--primary">
          Send Message
        </button>
      </HumanCheckForm>
    </main>
  );
}
