import "./FormLogIn.css";
import { InputFieldStateDefaultValueTypePlaceholder } from "../InputFieldStateDefaultValueTypePlaceholder/InputFieldStateDefaultValueTypePlaceholder.jsx";
import { ButtonGroupAlignJustify } from "../ButtonGroupAlignJustify/ButtonGroupAlignJustify.jsx";
import { TextLink } from "../TextLink/TextLink.jsx";

export const FormLogIn = ({ className, ...props }) => {
  return (
    <div className={"form-log-in " + className}>
      <InputFieldStateDefaultValueTypePlaceholder
        label="Email"
        className="input-field-instance"
      ></InputFieldStateDefaultValueTypePlaceholder>
      <InputFieldStateDefaultValueTypePlaceholder
        label="Password"
        className="input-field-instance"
      ></InputFieldStateDefaultValueTypePlaceholder>
      <ButtonGroupAlignJustify
        buttonStart={false}
        align="justify"
        className="button-group-instance"
      ></ButtonGroupAlignJustify>
      <TextLink
        text="Forgot password?"
        className="text-link-instance"
      ></TextLink>
    </div>
  );
};
