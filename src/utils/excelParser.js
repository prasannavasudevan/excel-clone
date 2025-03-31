import * as XLSX from "xlsx";

export const parseExcel = (file, setData) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    setData(jsonData);
  };
};
