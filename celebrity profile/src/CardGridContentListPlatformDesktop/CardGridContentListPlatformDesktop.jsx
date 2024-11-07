import "./CardGridContentListPlatformDesktop.css";
import { TextContentHeadingAlignStart } from "../TextContentHeadingAlignStart/TextContentHeadingAlignStart.jsx";
import { InfoSize32 } from "../InfoSize32/InfoSize32.jsx";
import { CardAssetTypeImageVariantStrokeDirectionHorizontal } from "../CardAssetTypeImageVariantStrokeDirectionHorizontal/CardAssetTypeImageVariantStrokeDirectionHorizontal.jsx";

export const CardGridContentListPlatformDesktop = ({
  platform = "desktop",
  className,
  ...props
}) => {
  const variantsClassName = "platform-" + platform;

  return (
    <div
      className={
        "card-grid-content-list-platform-desktop " +
        className +
        " " +
        variantsClassName
      }
    >
      <TextContentHeadingAlignStart className="text-content-heading-instance"></TextContentHeadingAlignStart>
      <div className="cards">
        <CardAssetTypeImageVariantStrokeDirectionHorizontal
          icon={<InfoSize32 className="size-32-instance" />}
          assetType="image"
          variant="stroke"
          className="card-instance"
        ></CardAssetTypeImageVariantStrokeDirectionHorizontal>
        <CardAssetTypeImageVariantStrokeDirectionHorizontal
          icon={<InfoSize32 className="size-32-instance" />}
          assetType="image"
          variant="stroke"
          className="card-instance"
        ></CardAssetTypeImageVariantStrokeDirectionHorizontal>
        <CardAssetTypeImageVariantStrokeDirectionHorizontal
          icon={<InfoSize32 className="size-32-instance" />}
          assetType="image"
          variant="stroke"
          className="card-instance"
        ></CardAssetTypeImageVariantStrokeDirectionHorizontal>
      </div>
    </div>
  );
};
