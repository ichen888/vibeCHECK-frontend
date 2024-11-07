import "./InputFieldStateDefaultValueTypePlaceholder.css";

export const InputFieldStateDefaultValueTypePlaceholder = ({
  description = "Description",
  error = "Error",
  hasLabel = true,
  hasError = false,
  value = "Value",
  hasDescription = false,
  label = "Label",
  state = "default",
  valueType = "placeholder",
  className,
  ...props
}) => {
  const variantsClassName = "state-" + state + " value-type-" + valueType;

  return (
    <div
      className={
        "input-field-state-default-value-type-placeholder " +
        className +
        " " +
        variantsClassName
      }
    >
      {hasLabel && (
        <>
          <div className="label">{label} </div>
        </>
      )}
      {hasDescription && (
        <>
          <div className="description">{description} </div>
        </>
      )}
      <div className="input">
        <div className="value">{value} </div>
      </div>
      {hasError && (
        <>
          <div className="error">{error} </div>
        </>
      )}
    </div>
  );
};
