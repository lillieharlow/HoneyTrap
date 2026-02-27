# HoneyTrap

A client-side, accessibility-first React form library that stops spam bots without CAPTCHAs. 100% WCAG 2.2 AA compliant.

**Detects bots through three invisible layers of human behaviour**

- **1. Honeypot field:** Hidden field input that only bots fill
- **2. Timing validation:** Prevents instant, automated spam submissions
- **3. Interaction detection:** Tracks pointer movement OR keyboard inputs

**Security Note:** HoneyTrap provides client-side bot protection. Server-side validation and database constraints are still required for comprehensive security.

MIT License.

---

## Contents

- [Hardware Requirements](#hardware-requirements)
- [Software Requirements](#software-requirements)
- [Installation](#installation)
  - [Demo Install](#demo-install)
  - [Existing Project Install](#existing-project-install)
- [Usage](#usage)
- [Component Guide](#component-guide)
- [Dependencies](#dependencies)
  - [Development Dependencies](#development-dependencies)
- [Project Structure](#project-structure)
- [Documentation Style](#documentation-style)
  - [JSDoc Tags](#jsdoc-tags)
  - [Comment Syntax](#comment-syntax)
  - [Code Formatting](#code-formatting)

---

## Hardware Requirements

- **Processor:** 1 GHz or faster 64-bit CPU
- **RAM:** 2GB minimum, 4GB+ recommended
- **Disk Space:** 1 GB free (for node_modules and dependencies)
- **Network:** Internet access
- **OS:** Windows 10 or later, macOS 13.5 or later, or Linux (kernel 4.18+)

---

## Software Requirements

### Demo Install
- **React:** 19.x or higher
- **Node.js:** 18.x or higher
- **npm:** 9.x or higher
- **Git:** Any recent version (for cloning the repository)

### Existing Project Install
- **React:** 19.x or higher

---

## Installation

### Demo Install

#### 1. Clone the Repository

```bash
git clone https://github.com/lillielillielillie/honeytrap.git
cd honeytrap
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Start the Demo

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to interact with the HoneyTrap form components.

### Existing Project Install

#### 1. Copy Files

Copy these files into your React project `src` directory (manually via file explorer or using terminal commands):

```
your-project/
└── src/
    ├── components/
    │   ├── HumanCheckForm.jsx
    │   ├── HoneypotField.jsx
    │   └── FormField.jsx
    └── hooks/
        └── useHumanCheck.js
```

#### 2. Verify React Version

Ensure you have React 18.x or 19.x installed:

```bash
npm install react@^19.2.0 react-dom@^19.2.0
```

#### 3. Add Accessibility-first CSS

HoneyTrap adheres to specific CSS styling to meet WCAG 2.2 AA standards. Copy and paste the CSS from [ACCESSIBILITY_CSS.md](ACCESSIBILITY_CSS.md) into your project's `index.css`.

#### 4. Import and Use

1. Open the file that contains your form component.
2. Import `HumanCheckForm`, `FormField` and CSS styles from `index.css`.
3. Replace your `<form>` element with `<HumanCheckForm onValidSubmit={handleSubmit}>`.
4. Replace each `<input>` and `<label>` pair with `<FormField>`.
5. Add `className="form-input"` to every `<input>` element.
6. Add `className="form-textarea"` to every `<textarea>` element.

Example:

```jsx
import HumanCheckForm from "./components/HumanCheckForm";
import FormField from "./components/FormField";
import "./index.css";

export default function ContactForm() {
  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    // Send formData to your server
  };

  return (
    <HumanCheckForm onValidSubmit={handleSubmit}>
      <fieldset>
        <legend>Contact Information</legend>
        <FormField id="name" label="Your Name">
          <input
            id="name"
            name="name"
            type="text"
            required
            className="form-input"
          />
        </FormField>
        <FormField id="email" label="Email">
          <input
            id="email"
            name="email"
            type="email"
            required
            className="form-input"
          />
        </FormField>
        <FormField id="message" label="Message">
          <textarea
            id="message"
            name="message"
            required
            className="form-textarea"
          />
        </FormField>
      </fieldset>
      <button type="submit">Send</button>
    </HumanCheckForm>
  );
}
```

---

## Usage

### Development Environment

```bash
npm run dev
```

Available at `http://localhost:5173`

### Production Environment

```bash
npm start
```

Available at `http://localhost:4173`

### Running ESLint

```bash
npm run lint
```

---

## Component Guide

| Component              | Type      | Purpose                                             | Key Features                                                                                                                                                                                                       |
| ---------------------- | --------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **useHumanCheck.js**   | Hook      | Core validation logic for detecting bot submissions | - Keyboard + pointer OR logic (10+ movements OR 3+ key presses)<br/>- Text-based error messages<br/>- 2500ms minimum timing check<br/>- Accessibility-neutral (no DOM assumptions)                                 |
| **HoneypotField.jsx**  | Component | Hidden field that only bots fill                    | - `tabIndex={-1}` removes from keyboard focus<br/>- `aria-hidden="true"` hides from screen readers<br/>- `autoComplete="off"` prevents browser autofill<br/>- Standard "website" field name catches common bots    |
| **FormField.jsx**      | Component | Accessible label + input wrapper                    | - htmlFor/id association (WCAG 1.3.1)<br/>- Semantic HTML with proper `<label>` element<br/>- Screen reader support for all inputs<br/>- Works with any form control (input, textarea, select)                     |
| **HumanCheckForm.jsx** | Component | Main form wrapper with validation & error handling  | - `aria-live="assertive"` + `role="alert"` for screen readers<br/>- Focus management & scrolling to errors<br/>- `noValidate` prevents browser interference<br/>- Conditional error rendering & honeypot inclusion |

---

## Dependencies

| Package   | Version | License | Purpose                                        |
| --------- | ------- | ------- | ---------------------------------------------- |
| react     | ^19.2.0 | MIT     | UI library for building interactive components |
| react-dom | ^19.2.0 | MIT     | React rendering library for the DOM            |

### Development Dependencies

| Package                     | Version | License | Purpose                                   |
| --------------------------- | ------- | ------- | ----------------------------------------- |
| vite                        | ^7.3.1  | MIT     | Fast build tool and dev server            |
| eslint                      | ^9.39.1 | MIT     | JavaScript linter for code quality        |
| @vitejs/plugin-react        | ^5.1.1  | MIT     | Vite plugin for React Fast Refresh        |
| eslint-plugin-react-hooks   | ^7.0.1  | MIT     | ESLint rules for React Hooks              |
| eslint-plugin-react-refresh | ^0.4.24 | MIT     | ESLint rules for React Fast Refresh       |
| @eslint/js                  | ^9.39.1 | MIT     | ESLint core configuration and rules       |
| globals                     | ^16.5.0 | MIT     | Global variable definitions for ESLint    |
| @types/react                | ^19.2.7 | MIT     | TypeScript type definitions for React     |
| @types/react-dom            | ^19.2.3 | MIT     | TypeScript type definitions for React DOM |

---

## Project Structure

```
honeytrap/
├── src/
│   ├── components/
│   │   ├── FormField.jsx          # Label + input wrapper
│   │   ├── HoneypotField.jsx      # Hidden field component
│   │   └── HumanCheckForm.jsx     # Form wrapper component
│   ├── hooks/
│   │   └── useHumanCheck.js       # Core validation logic
│   ├── App.jsx                    # Demo application
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Application entry point
├── ACCESSIBILITY_CSS.md           # Accessibility-first styling
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML template
├── LICENSE                        # MIT license
├── package.json                   # Dependencies and scripts
├── README.md                      # Documentation
└── vite.config.js                 # Vite configuration
```

---

## Documentation Style

HoneyTrap uses **JSDoc** commenting style for all JavaScript files. Each JSDoc comment is immediately before the code it documents.

### JSDoc Tags

- `@param` - Parameter type and description
- `@returns` - Return value description
- `@see` - External documentation reference/related link
- `@example` - Code usage example
- `@component` - Marks a React component function

### Comment Syntax

- **JavaScript files (`.js`, `.jsx`):** `/** */` for JSDoc, `//` for inline comments
- **CSS files:** `/* */`
- **HTML files:** `<!-- -->`
- **JSON files:** No comments
- **Config files (`.gitignore`):** `#`

### Code Formatting

Enforced by ESLint.

**Basic Formatting:**

- **Line length:** 80 characters maximum
- **Indentation:** 2 spaces
- **Quotes:** Double quotes
- **Semicolons:** Required

**Code Quality:**

- **React Hooks:** Follows React Hooks best practices (dependency arrays, naming)
- **React Refresh:** Components must be default or named exports only
- **Unused variables:** Not allowed (except uppercase constants like `_UNUSED`)

---
