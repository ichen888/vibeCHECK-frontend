import "./StarSize16.css";

export const StarSize16 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"star-size-16 " + className + " " + variantsClassName}
      src="star-size-16.svg"
    />
  );
};
