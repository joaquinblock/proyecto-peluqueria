package com.lauchastudio.gestorturnos.repository;


import com.lauchastudio.gestorturnos.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
}
