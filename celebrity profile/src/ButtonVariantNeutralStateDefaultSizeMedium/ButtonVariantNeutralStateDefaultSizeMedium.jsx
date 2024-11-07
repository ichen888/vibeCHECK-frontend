import "./ButtonVariantNeutralStateDefaultSizeMedium.css";
import { StarSize162 } from "../StarSize162/StarSize162.jsx";
import { XSize162 } from "../XSize162/XSize162.jsx";
import { StarSize16 } from "../StarSize16/StarSize16.jsx";
import { XSize16 } from "../XSize16/XSize16.jsx";

export const ButtonVariantNeutralStateDefaultSizeMedium = ({
  hasIconStart = false,
  iconStart = <StarSize162 className="star-instance" size="16" />,
  hasIconEnd = false,
  iconEnd = <XSize162 className="x-instance" size="16" />,
  label = "Button",
  variant = "primary",
  state = "default",
  size = "medium",
  className,
  ...props
}) => {
  const variantsClassName =
    "variant-" + variant + " state-" + state + " size-" + size;

  return (
    <div
      className={
        "button-variant-neutral-state-default-size-medium " +
        className +
        " " +
        variantsClassName
      }
    >
      {hasIconStart && <>{iconStart}</>}
      <div className="button">{label} </div>
      {hasIconEnd && <>{iconEnd}</>}
    </div>
  );
};
