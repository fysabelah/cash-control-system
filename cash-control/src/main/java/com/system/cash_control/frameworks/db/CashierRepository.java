package com.system.cash_control.frameworks.db;

import com.system.cash_control.entities.Cashier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CashierRepository extends JpaRepository<Cashier, Integer> {

    Optional<Cashier> findByIdAndDeleted(Integer id, boolean status);

    @Query("SELECT c FROM Cashier c WHERE c.id = ?1 and UPPER(c.description) LIKE %?2% and c.deleted = false")
    Page<Cashier> findAllByIdAndDescription(Integer cashierId, String description, Pageable pageable);

    @Query("SELECT c FROM Cashier c WHERE c.id = ?1 and c.deleted = false")
    Page<Cashier> findById(Integer cashierId, Pageable pageable);

    @Query("SELECT c FROM Cashier c WHERE UPPER(c.description) LIKE %?1% and c.deleted = false")
    Page<Cashier> findByDescriptionLike(String description, Pageable pageable);

    Page<Cashier> findByDeleted(boolean b, Pageable pageable);
}
