import "./StarSize162.css";

export const StarSize162 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"star-size-162 " + className + " " + variantsClassName}
      src="star-size-162.svg"
    />
  );
};
