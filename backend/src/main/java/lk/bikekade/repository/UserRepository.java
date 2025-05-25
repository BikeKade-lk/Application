package lk.bikekade.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bikekade.model.User;

public interface UserRepository extends JpaRepository<User,Long>{

}
