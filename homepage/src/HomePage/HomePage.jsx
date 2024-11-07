import "./HomePage.css";
import { LogInSize48 } from "../LogInSize48/LogInSize48.jsx";
import { SearchBarStateEnabledShowAvatarFalse } from "../SearchBarStateEnabledShowAvatarFalse/SearchBarStateEnabledShowAvatarFalse.jsx";

export const HomePage = ({ className, ...props }) => {
  return (
    <div className={"home-page " + className}>
      <div className="vibe-check">vibeCHECK </div>
      <LogInSize48 className="log-in-instance"></LogInSize48>
      <SearchBarStateEnabledShowAvatarFalse
        placeholderText="What’s __________’s vibe?"
        state="enabled"
        showAvatar="false"
        className="search-bar-instance"
      ></SearchBarStateEnabledShowAvatarFalse>
    </div>
  );
};
