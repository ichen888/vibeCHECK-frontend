import "./ClockSize48.css";

export const ClockSize48 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"clock-size-48 " + className + " " + variantsClassName}
      src="clock-size-48.svg"
    />
  );
};
