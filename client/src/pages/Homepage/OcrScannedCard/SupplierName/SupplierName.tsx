const SupplierName: React.FC<{ supplierName: string }> = ({ supplierName }) => {
  return (
    <div>
      <p>שם הספק: {supplierName}ש</p>
    </div>
  );
};

export default SupplierName;
