const ScannedPage: React.FC<{ pageNumber: number }> = ({ pageNumber }) => {
  return (
    <div>
      <p className="font-bold">{pageNumber}</p>
    </div>
  );
};

export default ScannedPage;
