import "./AvatarTypeImageSizeLargeShapeCircle.css";

export const AvatarTypeImageSizeLargeShapeCircle = ({
  initials = "F",
  type = "initial",
  size = "large",
  shape = "square",
  className,
  ...props
}) => {
  const variantsClassName =
    "type-" + type + " size-" + size + " shape-" + shape;

  return (
    <div
      className={
        "avatar-type-image-size-large-shape-circle " +
        className +
        " " +
        variantsClassName
      }
    >
      <img className="shape" src="shape0.png" />
    </div>
  );
};
