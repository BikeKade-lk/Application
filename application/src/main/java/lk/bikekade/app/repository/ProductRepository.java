package lk.bikekade.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import lk.bikekade.app.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
