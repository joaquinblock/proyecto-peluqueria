package com.lauchastudio.gestorturnos.service;

import com.lauchastudio.gestorturnos.model.HorarioPlantilla;
import com.lauchastudio.gestorturnos.repository.HorarioPlantillaRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@Service
public class HorarioPlantillaService {
    private final HorarioPlantillaRepository plantillaRepository;

    public HorarioPlantillaService(HorarioPlantillaRepository plantillaRepository) {
        this.plantillaRepository = plantillaRepository;
    }

    public Optional<HorarioPlantilla> findById(Long id) {
        return plantillaRepository.findById(id);
    }

    public List<HorarioPlantilla> findAll() {
        return plantillaRepository.findAll();
    }

    public HorarioPlantilla save(HorarioPlantilla plantilla) {
        return plantillaRepository.save(plantilla);
    }

    public void delete(HorarioPlantilla plantilla) {
        plantillaRepository.delete(plantilla);
    }

    public DayOfWeek convertirDia(String dia) {
        return switch (dia.toLowerCase()) {
            case "lunes" -> DayOfWeek.MONDAY;
            case "martes" -> DayOfWeek.TUESDAY;
            case "miércoles", "miercoles" -> DayOfWeek.WEDNESDAY;
            case "jueves" -> DayOfWeek.THURSDAY;
            case "viernes" -> DayOfWeek.FRIDAY;
            case "sábado", "sabado" -> DayOfWeek.SATURDAY;
            case "domingo" -> DayOfWeek.SUNDAY;
            default -> throw new IllegalArgumentException("Día inválido: " + dia);
        };
    }

    public List<HorarioPlantilla> findByDiaSemana(DayOfWeek dia) {
        return plantillaRepository.findByDiaSemana(dia);
    }

}
