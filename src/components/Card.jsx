import "../styles/components/Card.css";

const Card = ({ title, children }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
