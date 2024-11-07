import "./LogInSize48.css";

export const LogInSize48 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"log-in-size-48 " + className + " " + variantsClassName}
      src="log-in-size-48.svg"
    />
  );
};
