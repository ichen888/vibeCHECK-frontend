import "./LoginPage.css";
import { FormLogIn } from "../FormLogIn/FormLogIn.jsx";

export const LoginPage = ({ className, ...props }) => {
  return (
    <div className={"login-page " + className}>
      <div className="form-log-in">
        <FormLogIn className="form-log-in-instance"></FormLogIn>
      </div>
      <div className="vibe-check-pro">vibeCHECK pro </div>
      <div className="complete-fan-insights-powered-by-data-analysis-ai-coming-soon-announcement-tbd">
        complete fan insights powered by data analysis &amp; AI
        <br />
        coming soon, announcement TBD{" "}
      </div>
    </div>
  );
};
