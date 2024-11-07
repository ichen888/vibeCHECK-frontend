import "./Search.css";

export const Search = ({ className, ...props }) => {
  return <img className={"search " + className} src="search.svg" />;
};
