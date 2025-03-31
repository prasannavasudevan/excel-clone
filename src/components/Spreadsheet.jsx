import React, { useRef, useEffect, useState } from "react";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";
import "../index.css";

const Spreadsheet = ({ data }) => {
  const hotTableRef = useRef(null);
  const [spreadsheetData, setSpreadsheetData] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      setSpreadsheetData([...data]);
    } else {
      setSpreadsheetData(Array.from({ length: 50 }, () => Array(10).fill("")));
    }
  }, [data]);

  const handleDataChange = (changes, source) => {
    if (source === "loadData" || !changes) return;
    setSpreadsheetData((prevData) => {
      const newData = prevData.map(row => [...row]);
      changes.forEach(([row, col, oldVal, newVal]) => {
        if (row < newData.length && col < newData[row].length) {
          newData[row][col] = newVal;
        }
      });
      return newData;
    });
  };

  return (
    <div className="spreadsheet-container" ref={containerRef}>
      <HotTable
        ref={hotTableRef}
        data={spreadsheetData}
        colHeaders={[
          "Sr No", "HS Code", "Description of Goods", "Rate", "Boxes",
          "Qty", "Net Weight", "Amount", "Discount", "Net Amount"
        ]}
        rowHeaders={true}
        columns={[
          {}, {}, {}, { type: "numeric" }, {}, {}, { type: "numeric" }, {}, {}, {}
        ]}
        width="100%"
        height="calc(100vh - 100px)"
        manualColumnResize={true}
        manualRowResize={true}
        columnSorting={true}
        contextMenu={true}
        stretchH="none"
        viewportRowRenderingOffset="auto"
        viewportColumnRenderingOffset="auto"
        outsideClickDeselects={false}
        licenseKey="non-commercial-and-evaluation"
        afterChange={handleDataChange}
        persistentState={true}
        selectionMode="multiple" // Enable cell selection
      />
    </div>
  );
};

export default Spreadsheet;