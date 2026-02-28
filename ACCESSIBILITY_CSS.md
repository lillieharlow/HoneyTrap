# HoneyTrap - Accessibility-first CSS
Copy and paste the CSS below into your project `index.css` file to meet WCAG 2.2 AA compliance.

## Accessibility Features

- **WCAG 2.4.7** - Focus Visible: 3px solid outline with 2px offset  
- **WCAG 1.4.3** - Contrast Minimum: Error messages meet 4.5:1 ratio  
- **WCAG 4.1.3** - Status Messages: Error styling works with aria-live  
- **Mobile Accessibility**: 1rem font prevents iOS auto-zoom  
- **Screen Reader Support**: Honeypot hidden with aria-hidden pattern  

## Customization

You can customise the colour values in `:root`, but ensure:
- Text contrast ratio ≥ 4.5:1 for normal text
- UI component contrast ratio ≥ 3:1
- Focus indicators remain clearly visible

Use this contrast checker to maintain accessibility-first: https://webaim.org/resources/contrastchecker/

```css
/* Colour Variables */
:root {
  --color-primary: #2563eb;
  --color-border: #6b7280;
  --color-error: #991b1b;
  --color-error-bg: #fee2e2;
  --color-error-border: #fecaca;
}

/* Honeypot Field - makes the field invisible to users and screen readers */
.honeypot-container {
  position: absolute;
  left: -10000px;
  opacity: 0;
  height: 0;
  width: 0;
  overflow: hidden;
}

/* Form Input Styling - font-size: 1rem prevents iOS auto-zoom. Provides consistent, accessible form controls */
.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.form-textarea {
  resize: vertical;
}

/* Focus Indicators (WCAG 2.4.7) - Visible focus for keyboard navigation */
button:focus,
input:focus,
textarea:focus {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

label:focus-within {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* Error Messages (WCAG 1.4.3, 4.1.3) - High contrast colours for visibility. Used with aria-live regions for screen readers */
.hc-error {
  background: var(--color-error-bg);
  color: var(--color-error);
  border: 2px solid var(--color-error-border);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.hc-error:focus {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* Form Field Container - readability spacing */
.form-field {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
```
