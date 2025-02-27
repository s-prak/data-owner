import "../styles/components/InputField.css";

const InputField = ({ label, value, onChange, type = "text", required }) => (
  <div className="input-field-container">
    <label className="input-label">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="input-field"
      required={required}
    />
  </div>
);

export default InputField;
