import "./XSize16.css";

export const XSize16 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"x-size-16 " + className + " " + variantsClassName}
      src="x-size-16.svg"
    />
  );
};
