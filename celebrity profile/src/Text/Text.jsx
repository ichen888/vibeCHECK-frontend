import "./Text.css";

export const Text = ({ text = "Text", className, ...props }) => {
  return (
    <div className={"text " + className}>
      <div className="text2">{text} </div>
    </div>
  );
};
