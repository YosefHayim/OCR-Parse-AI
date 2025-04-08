import "./loader.css";

const Loader = ({ smallLoader = false }) => {
  return <div className={`loader ${smallLoader && "small-loader"}`}></div>;
};

export default Loader;
