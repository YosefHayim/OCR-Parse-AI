const DebugText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div>
      <p className="font-bold">{text}</p>
    </div>
  );
};

export default DebugText;
