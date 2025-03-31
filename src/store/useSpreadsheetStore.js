import { create } from "zustand";

const useSpreadsheetStore = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),

  updateCell: (rowIndex, colKey, value) =>
    set((state) => {
      const updatedData = [...state.data];
      updatedData[rowIndex] = { ...updatedData[rowIndex], [colKey]: value };
      updatedData[rowIndex] = calculateRow(updatedData[rowIndex]);
      return { data: updatedData };
    }),
}));

const calculateRow = (row) => {
  const amount = row.Rate * row.Boxes * row.Qty || 0;
  const discount = Math.min(amount * 0.15, 50);
  const netAmount = amount - discount;

  return { ...row, Amount: amount, Discount: discount, "Net Amount": netAmount };
};

export default useSpreadsheetStore;
