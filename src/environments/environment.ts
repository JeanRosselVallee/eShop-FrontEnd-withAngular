
export const environment = {
  production: false,
  getCatalogURL:  "http://localhost:8080/products",
  //getCatalogURL:  "http://192.168.134.113:8080/products",
  postCatalogURL: "http://localhost:8080/products/add",
  delCatalogURL:  "http://localhost:8080/products/rem",
  //putCatalogURL:  "http://localhost:8080/products/update",
  postCartURL:    "http://localhost:8080/carts/add-product",
  getCartURL:     "http://localhost:8080/carts/get-cart-by-id",
  getCartIdURL:   "http://localhost:8080/carts/get-cart-id",
  delCartURL:     "http://localhost:8080/carts/rem",
  //delCartProdURL: "http://localhost:8080/carts/remove-product",
  //getAllCartsURL: "http://localhost:8080/carts/all",
  authUrl:        "http://localhost:8080/users/auth", 
  getUsersUrl:    "http://localhost:8080/users", 
  postUserUrl:    "http://localhost:8080/users/add", 
  delUserUrl:     "http://localhost:8080/users/remove", 
  //putUserUrl:     "http://localhost:8080/users/update",
  loginUrl:       "http://localhost:8080/users/login"
};

