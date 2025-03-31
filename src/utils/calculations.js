export const calculateAmount = (rate, boxes, qty) => rate * boxes * qty;

export const calculateDiscount = (amount) => Math.min(amount * 0.15, 50);

export const calculateNetAmount = (amount, discount) => amount - discount;
