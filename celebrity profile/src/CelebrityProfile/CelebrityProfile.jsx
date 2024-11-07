import "./CelebrityProfile.css";
import { UsersSize48 } from "../UsersSize48/UsersSize48.jsx";
import { StatsCard } from "../StatsCard/StatsCard.jsx";
import { GlobeSize48 } from "../GlobeSize48/GlobeSize48.jsx";
import { AvatarTypeImageSizeLargeShapeCircle } from "../AvatarTypeImageSizeLargeShapeCircle/AvatarTypeImageSizeLargeShapeCircle.jsx";
import { SearchBarStateEnabledShowAvatarFalse } from "../SearchBarStateEnabledShowAvatarFalse/SearchBarStateEnabledShowAvatarFalse.jsx";
import { LogInSize48 } from "../LogInSize48/LogInSize48.jsx";
import { HomeSize48 } from "../HomeSize48/HomeSize48.jsx";
import { CardGridContentListPlatformDesktop } from "../CardGridContentListPlatformDesktop/CardGridContentListPlatformDesktop.jsx";
import { StarSize16 } from "../StarSize16/StarSize16.jsx";
import { XSize16 } from "../XSize16/XSize16.jsx";
import { ButtonVariantSubtleStateDefaultSizeMedium } from "../ButtonVariantSubtleStateDefaultSizeMedium/ButtonVariantSubtleStateDefaultSizeMedium.jsx";
import { ButtonVariantPrimaryStateDefaultSizeMedium } from "../ButtonVariantPrimaryStateDefaultSizeMedium/ButtonVariantPrimaryStateDefaultSizeMedium.jsx";

export const CelebrityProfile = ({ className, ...props }) => {
  return (
    <div className={"celebrity-profile " + className}>
      <StatsCard
        icon={<UsersSize48 className="users-instance" size="48" />}
        className="stats-card-instance"
      ></StatsCard>
      <StatsCard
        icon={<GlobeSize48 className="globe-instance" size="48" />}
        className="stats-card-instance2"
      ></StatsCard>
      <div className="celebrity-name">Celebrity Name </div>
      <div className="profession">Profession </div>
      <div className="nationality-age">Nationality &amp; Age </div>
      <AvatarTypeImageSizeLargeShapeCircle
        type="image"
        shape="circle"
        className="avatar-instance"
      ></AvatarTypeImageSizeLargeShapeCircle>
      <SearchBarStateEnabledShowAvatarFalse
        placeholderText="Who’s the Celebrity?"
        state="enabled"
        showAvatar="false"
        className="search-bar-instance"
      ></SearchBarStateEnabledShowAvatarFalse>
      <div className="vibe-check">vibeCHECK </div>
      <LogInSize48 className="log-in-instance"></LogInSize48>
      <HomeSize48 className="home-instance"></HomeSize48>
      <div className="_56">56% </div>
      <div className="_562">56% </div>
      <div className="_44">44% </div>
      <div className="good-vibes">good vibes </div>
      <CardGridContentListPlatformDesktop className="card-grid-content-list-instance"></CardGridContentListPlatformDesktop>
      <div className="what-s-in-the-news">what’s in the news? </div>
      <CardGridContentListPlatformDesktop className="card-grid-content-list-instance2"></CardGridContentListPlatformDesktop>
      <div className="recent-content">recent content </div>
      <div className="vibecheck-vote">
        <ButtonVariantSubtleStateDefaultSizeMedium
          iconStart={<StarSize16 className="star-instance" size="16" />}
          iconEnd={<XSize16 className="x-instance" size="16" />}
          label="Good Vibes"
          variant="subtle"
          className="button-instance"
        ></ButtonVariantSubtleStateDefaultSizeMedium>
        <ButtonVariantPrimaryStateDefaultSizeMedium
          iconStart={<StarSize16 className="star-instance" size="16" />}
          iconEnd={<XSize16 className="x-instance" size="16" />}
          label="Bad Vibes"
          className="button-instance2"
        ></ButtonVariantPrimaryStateDefaultSizeMedium>
      </div>
      <div className="what-s-your-vote">what’s your vote? </div>
      <div className="the-vibes-in-depth">the vibes in-depth </div>
    </div>
  );
};
