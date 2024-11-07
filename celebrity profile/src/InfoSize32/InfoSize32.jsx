import "./InfoSize32.css";

export const InfoSize32 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"info-size-32 " + className + " " + variantsClassName}
      src="info-size-32.svg"
    />
  );
};
