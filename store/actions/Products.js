export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, descrption, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      descrption,
      imageUrl,
      price,
    },
  };
};

export const updateProduct = (id, title, descrption, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id, 
    productData: {
      title,
      descrption,
      imageUrl,
    },
  };
};
