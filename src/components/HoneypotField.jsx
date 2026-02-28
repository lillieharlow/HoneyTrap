/**
 * Hidden honeypot input.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.name="website"] - Form field name used for bot detection.
 * @returns {JSX.Element}
 */
export default function HoneypotField({ name = "website" }) {
  return (
    <input
      type="text"
      name={name}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="honeypot-container"
    />
  );
}