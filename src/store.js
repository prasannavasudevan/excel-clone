import { create } from "zustand";

const useStore = create((set) => ({
  data: Array(10).fill({
    srNo: "",
    hsCode: "",
    description: "",
    rate: "",
    boxes: "",
    qty: "",
    netWeight: "",
    amount: "",
    discount: "",
    netAmount: "",
  }),
  setData: (newData) => set({ data: newData }),
}));

export default useStore;
