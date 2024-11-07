import "./TextLink.css";

export const TextLink = ({ text = "Text Link", className, ...props }) => {
  return (
    <div className={"text-link " + className}>
      <div className="text-link2">{text} </div>
    </div>
  );
};
