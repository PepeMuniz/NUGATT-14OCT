export const formatPrice = (price: number) => {
  return price.toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const calculateDiscountedPrice = (price: number) => {
  return price * 0.8; // 20% de descuento
};