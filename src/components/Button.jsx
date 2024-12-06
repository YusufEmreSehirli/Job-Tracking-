const Button = ({ text, type = "submit" }) => {
  return (
    <button type="type" className="c_button">
      {" "}
      <span>{text}</span>
    </button>
  );
};

export default Button;
