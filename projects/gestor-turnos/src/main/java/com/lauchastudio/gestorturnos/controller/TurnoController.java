package com.lauchastudio.gestorturnos.controller;

import com.lauchastudio.gestorturnos.model.Turno;
import com.lauchastudio.gestorturnos.service.TurnoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/turnos")
public class TurnoController {
    private final TurnoService turnoService;

    public TurnoController(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turno> getTurno(@PathVariable Long id) {
        Optional<Turno> turno = turnoService.findById(id);
        if (turno.isPresent()) {
            return ResponseEntity.ok(turno.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Turno>> getTurnos() {
        List<Turno> turnos = turnoService.findAllTurnos();
        if(turnos.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(turnos);
        }
    }

    @PostMapping
    public ResponseEntity<Turno> createTurno(@RequestBody @Valid Turno turno) {
        turnoService.addTurno(turno);
        return ResponseEntity.ok(turno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Turno> updateTurno(@RequestBody Turno turno, @PathVariable Long id) {
        Optional<Turno> t = turnoService.findById(id);
        if(!t.isPresent()){
            return ResponseEntity.notFound().build();
        }
        Turno turnoUpdate = t.get();
        turnoUpdate.setFechaHora(turno.getFechaHora());
        turnoUpdate.setServicio(turno.getServicio());

        turnoService.addTurno(turnoUpdate);
        return ResponseEntity.ok(turnoUpdate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Turno> deleteTurno(@PathVariable Long id) {
        if(!turnoService.findById(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        turnoService.deleteTurno(id);
        return ResponseEntity.noContent().build();
    }
}
