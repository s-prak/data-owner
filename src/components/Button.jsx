const Button = ({ text, onClick, disabled }) => (
    <button
      onClick={onClick}
      className="submit-button"
      disabled={disabled}
    >
      {text}
    </button>
  );
export default Button;