import "./XSize162.css";

export const XSize162 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"x-size-162 " + className + " " + variantsClassName}
      src="x-size-162.svg"
    />
  );
};
