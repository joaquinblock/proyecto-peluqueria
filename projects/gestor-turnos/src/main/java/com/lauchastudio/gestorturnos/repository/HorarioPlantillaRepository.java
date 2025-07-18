package com.lauchastudio.gestorturnos.repository;

import com.lauchastudio.gestorturnos.model.HorarioPlantilla;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface HorarioPlantillaRepository extends JpaRepository<HorarioPlantilla, Long> {
    List<HorarioPlantilla> findByDiaSemana(DayOfWeek diaSemana);
}

