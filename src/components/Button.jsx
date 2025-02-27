import "../styles/components/Button.css";

const Button = ({ text, onClick, disabled }) => (
  <button onClick={onClick} className={`button ${disabled ? "button-disabled" : ""}`} disabled={disabled}>
    {text}
  </button>
);

export default Button;
