// utils/FormValidation.js
/**
 * Validates a product form based on product type
 * @param {Object} formData - The form data to validate
 * @returns {Object} Object containing validation errors if any
 */
export function validateProductForm(formData) {
    const errors = {};
  
    // Basic validations
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Product name is required";
    }
  
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = "Price must be greater than zero";
    }
  
    // Spare part specific validations
    if (formData.productType === "spare part") {
      if (!formData.brand) {
        errors.brand = "Brand is required for spare parts";
      }
  
      if (!formData.partType) {
        errors.partType = "Part type is required for spare parts";
      }
  
      if (!formData.bikeModel) {
        errors.bikeModel = "Bike model is required for spare parts";
      }
    }
  
    return errors;
  }
  
  /**
   * Format a bike model string to uppercase with hyphens instead of spaces
   * @param {string} modelString - The bike model string to format
   * @returns {string} Formatted bike model string
   */
  export function formatBikeModel(modelString) {
    return modelString.toUpperCase().replace(/\s+/g, "-");
  }
  
  /**
   * Check if an image file is valid (size < 1MB)
   * @param {File} file - The image file to validate
   * @returns {Object} Object containing validation result
   */
  export function validateImageFile(file) {
    if (!file) {
      return { valid: true };
    }
    
    if (file.size > 1024 * 1024) { // 1MB
      return { 
        valid: false, 
        error: "Image file is too large. Please use an image smaller than 1MB." 
      };
    }
    
    return { valid: true };
  }