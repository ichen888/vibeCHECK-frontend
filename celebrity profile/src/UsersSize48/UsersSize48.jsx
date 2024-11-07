import "./UsersSize48.css";

export const UsersSize48 = ({ size = "48", className, ...props }) => {
  const variantsClassName = "size-" + size;

  return (
    <img
      className={"users-size-48 " + className + " " + variantsClassName}
      src="users-size-48.svg"
    />
  );
};
