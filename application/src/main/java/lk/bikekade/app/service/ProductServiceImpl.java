package lk.bikekade.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.bikekade.app.model.Product;
import lk.bikekade.app.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public Product saveProduct(Product product) {
        // Basic validation
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Product name cannot be empty");
        }
        
        if (product.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be greater than zero");
        }
        
        // Validate spare part specific fields
        if ("spare part".equals(product.getProductType())) {
            if (product.getBrand() == null || product.getBrand().trim().isEmpty()) {
                throw new IllegalArgumentException("Brand is required for spare parts");
            }
            
            if (product.getPartType() == null || product.getPartType().trim().isEmpty()) {
                throw new IllegalArgumentException("Part type is required for spare parts");
            }
            
            if (product.getBikeModel() == null || product.getBikeModel().trim().isEmpty()) {
                throw new IllegalArgumentException("Bike model is required for spare parts");
            }
            
            // Ensure bike model follows the format rules (uppercase, no spaces)
            String bikeModel = product.getBikeModel().toUpperCase().replace(" ", "-");
            product.setBikeModel(bikeModel);
        }
        
        // Handle potential large image data
        if (product.getImage() != null && product.getImage().length() > 1_000_000) {
            // If image is very large, you might want to compress it or handle it differently
            // For now, we'll just log it
            System.out.println("Large image detected: " + product.getImage().length() + " characters");
        }
        
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }

    @Override
    @Transactional
    public Product updateProduct(int id, Product product) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
                
        // Update fields only if they're provided
        if (product.getName() != null && !product.getName().trim().isEmpty()) {
            existing.setName(product.getName());
        }
        
        if (product.getImage() != null) {
            existing.setImage(product.getImage());
        }
        
        if (product.getDescription() != null) {
            existing.setDescription(product.getDescription());
        }
        
        if (product.getPrice() > 0) {
            existing.setPrice(product.getPrice());
        }
        
        // Update product type fields
        if (product.getProductType() != null) {
            existing.setProductType(product.getProductType());
            
            // If product type is spare part, validate and update related fields
            if ("spare part".equals(product.getProductType())) {
                if (product.getBrand() != null && !product.getBrand().trim().isEmpty()) {
                    existing.setBrand(product.getBrand());
                } else if (existing.getBrand() == null || existing.getBrand().trim().isEmpty()) {
                    throw new IllegalArgumentException("Brand is required for spare parts");
                }
                
                if (product.getPartType() != null && !product.getPartType().trim().isEmpty()) {
                    existing.setPartType(product.getPartType());
                } else if (existing.getPartType() == null || existing.getPartType().trim().isEmpty()) {
                    throw new IllegalArgumentException("Part type is required for spare parts");
                }
                
                if (product.getBikeModel() != null && !product.getBikeModel().trim().isEmpty()) {
                    // Format bike model
                    String bikeModel = product.getBikeModel().toUpperCase().replace(" ", "-");
                    existing.setBikeModel(bikeModel);
                } else if (existing.getBikeModel() == null || existing.getBikeModel().trim().isEmpty()) {
                    throw new IllegalArgumentException("Bike model is required for spare parts");
                }
            }
        } else {
            // If product type isn't provided, check if the existing is a spare part
            // and the new data contains updates to spare part fields
            if ("spare part".equals(existing.getProductType())) {
                if (product.getBrand() != null) {
                    if (product.getBrand().trim().isEmpty()) {
                        throw new IllegalArgumentException("Brand cannot be empty for spare parts");
                    }
                    existing.setBrand(product.getBrand());
                }
                
                if (product.getPartType() != null) {
                    if (product.getPartType().trim().isEmpty()) {
                        throw new IllegalArgumentException("Part type cannot be empty for spare parts");
                    }
                    existing.setPartType(product.getPartType());
                }
                
                if (product.getBikeModel() != null) {
                    if (product.getBikeModel().trim().isEmpty()) {
                        throw new IllegalArgumentException("Bike model cannot be empty for spare parts");
                    }
                    // Format bike model
                    String bikeModel = product.getBikeModel().toUpperCase().replace(" ", "-");
                    existing.setBikeModel(bikeModel);
                }
            }
        }
        
        return productRepository.save(existing);
    }

    @Override
    @Transactional
    public void deleteProduct(int id) {
        // Check if product exists
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete. Product not found with id " + id);
        }
        productRepository.deleteById(id);
    }
}