import "./TextHeading.css";

export const TextHeading = ({ text = "Text Heading", className, ...props }) => {
  return (
    <div className={"text-heading " + className}>
      <div className="text-heading2">{text} </div>
    </div>
  );
};
