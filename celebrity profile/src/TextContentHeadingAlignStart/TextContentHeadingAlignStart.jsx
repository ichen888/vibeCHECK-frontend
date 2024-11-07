import "./TextContentHeadingAlignStart.css";

export const TextContentHeadingAlignStart = ({
  subheading = "Subheading",
  heading = "Heading",
  hasSubheading = true,
  align = "start",
  className,
  ...props
}) => {
  const variantsClassName = "align-" + align;

  return (
    <div
      className={
        "text-content-heading-align-start " +
        className +
        " " +
        variantsClassName
      }
    >
      <div className="heading">{heading} </div>
      {hasSubheading && (
        <>
          <div className="subheading">{subheading} </div>
        </>
      )}
    </div>
  );
};
