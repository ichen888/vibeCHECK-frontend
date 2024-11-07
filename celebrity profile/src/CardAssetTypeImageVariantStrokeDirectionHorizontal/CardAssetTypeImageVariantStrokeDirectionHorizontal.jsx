import "./CardAssetTypeImageVariantStrokeDirectionHorizontal.css";
import { InfoSize32 } from "../InfoSize32/InfoSize32.jsx";
import { ButtonVariantNeutralStateDefaultSizeMedium } from "../ButtonVariantNeutralStateDefaultSizeMedium/ButtonVariantNeutralStateDefaultSizeMedium.jsx";
import { ButtonVariantPrimaryStateDefaultSizeMedium } from "../ButtonVariantPrimaryStateDefaultSizeMedium/ButtonVariantPrimaryStateDefaultSizeMedium.jsx";
import { ButtonGroupAlignStart } from "../ButtonGroupAlignStart/ButtonGroupAlignStart.jsx";
import { XSize16 } from "../XSize16/XSize16.jsx";
import { StarSize16 } from "../StarSize16/StarSize16.jsx";

export const CardAssetTypeImageVariantStrokeDirectionHorizontal = ({
  icon = <InfoSize32 className="size-32-instance" />,
  body = "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. ",
  heading = "Title",
  button = true,
  asset = true,
  assetType = "icon",
  variant = "default",
  direction = "horizontal",
  className,
  ...props
}) => {
  const variantsClassName =
    "asset-type-" +
    assetType +
    " variant-" +
    variant +
    " direction-" +
    direction;

  return (
    <div
      className={
        "card-asset-type-image-variant-stroke-direction-horizontal " +
        className +
        " " +
        variantsClassName
      }
    >
      <img className="image" src="image0.png" />
      <div className="body">
        <div className="text">
          <div className="title">{heading} </div>
          <div className="body-text-for-whatever-you-d-like-to-say-add-main-takeaway-points-quotes-anecdotes-or-even-a-very-very-short-story">
            {body}{" "}
          </div>
        </div>
        {button && (
          <>
            <ButtonGroupAlignStart
              buttonStart={false}
              component0={
                <ButtonVariantNeutralStateDefaultSizeMedium
                  className="button-instance"
                  label="Button"
                  hasIconStart={false}
                  iconEnd={<XSize16 className="x-instance" size="16" />}
                  hasIconEnd={false}
                  iconStart={<StarSize16 className="star-instance" size="16" />}
                  variant="neutral"
                  state="default"
                  size="medium"
                />
              }
              className="button-group-instance"
            ></ButtonGroupAlignStart>
          </>
        )}
      </div>
    </div>
  );
};
