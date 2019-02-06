const products = [];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find(m => m._id === id);
}

export function updateProduct(product) {
  let productInDb = products.find(m => m._id === product._id);
  productInDb = product;

  return productInDb;
}

export function saveProduct(product) {
  let productInDb = products.find(m => m._id === product._id) || {};
  productInDb.name = product.name;
  productInDb.imgUrl = product.imgUrl;
  productInDb.description = product.description;
  productInDb.price = product.price;
  productInDb.subPrice = product.price;
  productInDb.count = 1;
  productInDb._id = product._id;

  products.push(productInDb);

  // if (!productInDb._id) {
  //   productInDb._id = Date.now().toString();
  //   products.push(productInDb);
  // }

  return productInDb;
}

export function deleteProduct(id) {
  let productInDb = products.find(m => m._id === id);
  products.splice(products.indexOf(productInDb), 1);
  return productInDb;
}
