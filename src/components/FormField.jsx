/**
 * Reusable labelled form field wrapper with explicit labelling for accessibility.
 * Label is associated with input via htmlFor/id for clear semantic connection.
 *
 * Accessibility: Screen readers announce labels, label click focuses input, keyboard users interact naturally.
 *
 * @component
 * @param {Object} props
 * @param {string} props.id - Input id used for the label association.
 * @param {string} props.label - Visible label text.
 * @param {JSX.Element} props.children - Form control element (input, textarea, etc).
 * @returns {JSX.Element}
 */
export default function FormField({ id, label, children }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {children}
    </div>
  );
}