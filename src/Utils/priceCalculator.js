export function calculateOrderAmounts(items, coupon = null) {
  const originalAmount = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const productDiscount = items.reduce((acc, item) => {
    const perProductDiscount =
      item.product.discountPrice > 0
        ? (item.product.price * item.product.discountPrice) / 100
        : 0;
    return acc + perProductDiscount * item.quantity;
  }, 0);

  const couponDiscount = coupon?.valid ? coupon.discountAmount : 0;

  const totalAmount = originalAmount - productDiscount - couponDiscount;

  return {
    originalAmount,
    discountAmount: productDiscount + couponDiscount,
    totalAmount,
  };
}
