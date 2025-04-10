const DebugText: React.FC<{ debugText: string }> = ({ debugText }) => {
  // currently hided for future cases if mom facing errors
  return (
    <div>
      <p className="hidden font-bold">{debugText}</p>
    </div>
  );
};

export default DebugText;
