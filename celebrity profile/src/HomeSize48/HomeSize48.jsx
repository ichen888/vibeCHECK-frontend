import "./HomeSize48.css";

export const HomeSize48 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"home-size-48 " + className + " " + variantsClassName}
      src="home-size-48.svg"
    />
  );
};
