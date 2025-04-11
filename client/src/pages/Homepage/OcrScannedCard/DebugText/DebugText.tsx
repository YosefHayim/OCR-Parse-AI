const DebugText: React.FC<{ debugText: string }> = ({ debugText }) => {
  return (
    <div>
      <p className="hidden font-bold">{debugText}</p>
    </div>
  );
};

export default DebugText;
