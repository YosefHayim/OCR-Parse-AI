const SupplierName: React.FC<{ supplierName: string }> = ({ supplierName }) => {
  return (
    <div>
      <p>שם הספק: {supplierName}</p>
    </div>
  );
};

export default SupplierName;
