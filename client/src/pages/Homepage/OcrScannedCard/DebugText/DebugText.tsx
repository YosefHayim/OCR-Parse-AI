const DebugText: React.FC<{ debugText: string }> = ({ debugText }) => {
  return (
    <div>
      <p className="font-bold">{debugText}</p>
    </div>
  );
};

export default DebugText;
