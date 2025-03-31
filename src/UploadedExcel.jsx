import React from "react";
import * as XLSX from "xlsx";
import useStore from "./store";

function UploadExcel() {
  const setData = useStore((state) => state.setData);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const headers = data[0];
      const rows = data.slice(1).map((row) =>
        headers.reduce((acc, header, index) => {
          acc[header] = row[index] || "";
          return acc;
        }, {})
      );

      setData(rows);
    };
  };

  return <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />;
}

export default UploadExcel;
