package com.lauchastudio.gestorturnos.service;

import com.lauchastudio.gestorturnos.model.Servicio;
import com.lauchastudio.gestorturnos.model.Turno;
import com.lauchastudio.gestorturnos.repository.TurnoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {
    private final TurnoRepository turnoRepository;

    public TurnoService(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    public Optional<Turno> findById(Long id) {
        return turnoRepository.findById(id);
    }

    public List<Turno> findAllTurnos() {
        return turnoRepository.findAll();
    }

    public Turno addTurno(Turno turno) {
        return turnoRepository.save(turno);
    }

    public void deleteTurno(Long id) {
        turnoRepository.deleteById(id);
    }
}
