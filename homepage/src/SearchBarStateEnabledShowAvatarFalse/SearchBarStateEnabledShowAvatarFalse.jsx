import "./SearchBarStateEnabledShowAvatarFalse.css";
import { Menu } from "../Menu/Menu.jsx";
import { IconButtonStyleStandardStateEnabled } from "../IconButtonStyleStandardStateEnabled/IconButtonStyleStandardStateEnabled.jsx";
import { Search } from "../Search/Search.jsx";
import { IconsMoreVert24Px } from "../IconsMoreVert24Px/IconsMoreVert24Px.jsx";

export const SearchBarStateEnabledShowAvatarFalse = ({
  show1stTrailingIcon = true,
  placeholderText = "Hinted search text",
  show2ndTrailingIcon = false,
  state = "pressed",
  showAvatar = "true",
  className,
  ...props
}) => {
  const variantsClassName = "state-" + state + " show-avatar-" + showAvatar;

  return (
    <div
      className={
        "search-bar-state-enabled-show-avatar-false " +
        className +
        " " +
        variantsClassName
      }
    >
      <div className="state-layer">
        <IconButtonStyleStandardStateEnabled
          icon={<Menu className="icon-instance" />}
          styleVariant="standard"
          state="enabled"
          className="leading-icon-instance"
        ></IconButtonStyleStandardStateEnabled>
        <div className="content">
          <div className="supporting-text">{placeholderText} </div>
        </div>
        <div className="trailing-elements">
          {show1stTrailingIcon && (
            <>
              <IconButtonStyleStandardStateEnabled
                icon={<Search className="icon-instance" />}
                styleVariant="standard"
                state="enabled"
                className="_1st-trailing-icon-instance"
              ></IconButtonStyleStandardStateEnabled>
            </>
          )}
          {show2ndTrailingIcon && (
            <>
              <IconButtonStyleStandardStateEnabled
                icon={<IconsMoreVert24Px className="icon-instance" />}
                styleVariant="standard"
                state="enabled"
                className="_2nd-trailing-icon-instance"
              ></IconButtonStyleStandardStateEnabled>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
