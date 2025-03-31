import React from "react";
import * as XLSX from "xlsx";

const FileUpload = ({ setData }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      console.log("Original Parsed Data:", jsonData.slice(0, 5));

      jsonData = jsonData.map(row => row.filter(cell => cell !== ""));

      jsonData = jsonData.filter(row => row.length >= 10);

      const expectedHeaders = [
        "Sr No", "HS Code", "Description of Goods", "Rate", "Boxes", "Qty",
        "Net Weight", "Amount", "Discount", "Net Amount"
      ];
      if (jsonData.length > 0) {
        jsonData[0] = expectedHeaders;
      }

      console.log("Cleaned JSON Data:", jsonData.slice(0, 5));

      setData([...jsonData]);
    };

    reader.readAsArrayBuffer(file);
  };

  return <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />;
};

export default FileUpload;
