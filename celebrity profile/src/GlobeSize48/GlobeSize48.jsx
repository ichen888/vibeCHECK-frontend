import "./GlobeSize48.css";

export const GlobeSize48 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"globe-size-48 " + className + " " + variantsClassName}
      src="globe-size-48.svg"
    />
  );
};
