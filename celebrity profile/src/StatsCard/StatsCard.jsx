import "./StatsCard.css";
import { ClockSize48 } from "../ClockSize48/ClockSize48.jsx";
import { TextHeading } from "../TextHeading/TextHeading.jsx";
import { Text } from "../Text/Text.jsx";

export const StatsCard = ({
  icon = <ClockSize48 className="clock-instance" size="48" />,
  className,
  ...props
}) => {
  return (
    <div className={"stats-card " + className}>
      {icon}
      <div className="review-body">
        <TextHeading text="100" className="text-heading-instance"></TextHeading>
        <Text text="Body text" className="text-instance"></Text>
      </div>
    </div>
  );
};
