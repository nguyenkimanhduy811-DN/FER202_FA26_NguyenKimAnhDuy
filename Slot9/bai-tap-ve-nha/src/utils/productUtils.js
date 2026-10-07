export function getFinalPrice(product) {
  if (typeof product.finalPrice === 'number') {
    return product.finalPrice;
  }

  if (typeof product.salePrice === 'number') {
    return product.salePrice;
  }

  if (typeof product.discount === 'number') {
    return product.price * (1 - product.discount / 100);
  }

  return product.price;
}

export function isProductInStock(product) {
  if (typeof product.inStock === 'boolean') {
    return product.inStock;
  }

  return Number(product.stock) > 0;
}