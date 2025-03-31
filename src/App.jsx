import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Spreadsheet from "./components/Spreadsheet";

const App = () => {
  const [tableData, setTableData] = useState([]);

  return (
    <div>
      <h1>Excel-Like Spreadsheet</h1>
      <FileUpload setData={(newData) => setTableData([...newData])} />
      <Spreadsheet data={tableData} />
    </div>
  );
};

export default App;

