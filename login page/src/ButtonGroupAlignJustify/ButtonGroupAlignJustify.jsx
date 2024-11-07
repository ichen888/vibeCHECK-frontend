import "./ButtonGroupAlignJustify.css";
import { XSize16 } from "../XSize16/XSize16.jsx";
import { StarSize16 } from "../StarSize16/StarSize16.jsx";
import { ButtonVariantSubtleStateDefaultSizeMedium } from "../ButtonVariantSubtleStateDefaultSizeMedium/ButtonVariantSubtleStateDefaultSizeMedium.jsx";
import { ButtonVariantPrimaryStateDefaultSizeMedium } from "../ButtonVariantPrimaryStateDefaultSizeMedium/ButtonVariantPrimaryStateDefaultSizeMedium.jsx";

export const ButtonGroupAlignJustify = ({
  buttonEnd = true,
  buttonStart = true,
  align = "start",
  className,
  ...props
}) => {
  const variantsClassName = "align-" + align;

  return (
    <div
      className={
        "button-group-align-justify " + className + " " + variantsClassName
      }
    >
      {buttonStart && (
        <>
          <ButtonVariantSubtleStateDefaultSizeMedium
            iconEnd={<XSize16 className="x-instance" size="16" />}
            iconStart={<StarSize16 className="star-instance" size="16" />}
            variant="subtle"
            className="button-instance"
          ></ButtonVariantSubtleStateDefaultSizeMedium>
        </>
      )}
      {buttonEnd && (
        <>
          <ButtonVariantPrimaryStateDefaultSizeMedium
            iconEnd={<XSize16 className="x-instance" size="16" />}
            iconStart={<StarSize16 className="star-instance" size="16" />}
            className="button-instance"
          ></ButtonVariantPrimaryStateDefaultSizeMedium>
        </>
      )}
    </div>
  );
};
