import productModel from "../models/productModel.js";

// Get all products
export async function getAllProducts() {
  try {
    const products = await productModel.find();
    if (!products || products.length === 0) {
      return {
        message: "No products found. Please add some.",
        status: 400,
      };
    }

    return {
      message: "Products retrieved successfully",
      status: 200,
      data: products,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    };
  }
}

// Add a new product
export async function addNewProduct({ name, price, category, stock }) {
  try {
    const product = await productModel.create({
      name,
      price,
      category,
      stock,
    });
    return {
      message: "Product created successfully",
      status: 201,
      data: product,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    };
  }
}

// Update a product
export async function updateProduct({ id, body }) {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return {
      message: "Product updated successfully",
      status: 200,
      data: updatedProduct,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    };
  }
}

// Delete product
export async function deleteProduct(id) {
  try {
    await productModel.findByIdAndDelete(id);
    return {
      message: "Product deleted successfully",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    };
  }
}
