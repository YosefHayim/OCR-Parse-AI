import "./loader.css";

const Loader = ({ smallLoader = false }) => {
  return (
    <div>
      {!smallLoader && <div className={`loader`}></div>}
      {smallLoader && <div className={`smallLoader`}></div>}
    </div>
  );
};

export default Loader;
