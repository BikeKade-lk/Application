package lk.bikekade.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image;

    @Column(length = 1000)
    private String description;

    private int price;
    
    // New fields for product type functionality
    @Column(length = 20)
    private String productType;
    
    @Column(length = 50)
    private String brand;
    
    @Column(length = 50)
    private String partType;
    
    @Column(length = 50)
    private String bikeModel;

    public Product() {
        // Default to accessory type when creating new products
        this.productType = "accessory";
    }

    public Product(int id, String name, String image, String description, int price) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.productType = "accessory"; // Default value
    }
    
    // Full constructor with all fields
    public Product(int id, String name, String image, String description, int price, 
                  String productType, String brand, String partType, String bikeModel) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.productType = productType;
        this.brand = brand;
        this.partType = partType;
        this.bikeModel = bikeModel;
    }

    // Existing getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
    
    // New getters and setters for product type functionality
    public String getProductType() { return productType; }
    public void setProductType(String productType) { this.productType = productType; }
    
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    
    public String getPartType() { return partType; }
    public void setPartType(String partType) { this.partType = partType; }
    
    public String getBikeModel() { return bikeModel; }
    public void setBikeModel(String bikeModel) { this.bikeModel = bikeModel; }
}