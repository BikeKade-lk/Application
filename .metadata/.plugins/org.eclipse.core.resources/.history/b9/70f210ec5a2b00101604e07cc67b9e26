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