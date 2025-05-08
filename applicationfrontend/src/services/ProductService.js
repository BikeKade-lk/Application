// services/ProductService.js
import axios from "axios";

const API_URL = "http://localhost:8080/product";

/**
 * Service class for product-related API calls
 */
export default class ProductService {
  /**
   * Get all products for a specific user
   * @param {string} username - The username of the user
   * @returns {Promise} Promise resolving to array of products
   */
  static async getUserProducts(username) {
    try {
      const response = await axios.get(`${API_URL}/user/name/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  /**
   * Add a new product for a user
   * @param {string} username - The username of the user
   * @param {Object} productData - The product data to add
   * @returns {Promise} Promise resolving to the added product
   */
  static async addProduct(username, productData) {
    try {
      const response = await axios.post(
        `${API_URL}/user/${username}/add`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }

  /**
   * Update an existing product
   * @param {number} productId - The ID of the product to update
   * @param {number} userId - The ID of the user who owns the product
   * @param {Object} productData - The updated product data
   * @returns {Promise} Promise resolving to the updated product
   */
  static async updateProduct(productId, userId, productData) {
    try {
      const response = await axios.put(
        `${API_URL}/update/${productId}?userId=${userId}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  /**
   * Delete a product
   * @param {number} productId - The ID of the product to delete
   * @param {number} userId - The ID of the user who owns the product
   * @returns {Promise} Promise resolving when the product is deleted
   */
  static async deleteProduct(productId, userId) {
    try {
      const response = await axios.delete(
        `${API_URL}/delete/${productId}?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}