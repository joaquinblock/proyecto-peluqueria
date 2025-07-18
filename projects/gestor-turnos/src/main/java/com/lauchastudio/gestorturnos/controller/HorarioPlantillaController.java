package com.lauchastudio.gestorturnos.controller;

import com.lauchastudio.gestorturnos.model.HorarioPlantilla;
import com.lauchastudio.gestorturnos.model.Turno;
import com.lauchastudio.gestorturnos.service.HorarioPlantillaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/horarios")
public class HorarioPlantillaController {
    private final HorarioPlantillaService horarioPlantillaService;

    public HorarioPlantillaController(HorarioPlantillaService horarioPlantillaService) {
        this.horarioPlantillaService = horarioPlantillaService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<HorarioPlantilla> getHorarioPlantilla(@PathVariable Long id) {
        Optional<HorarioPlantilla> horarioPlantilla = horarioPlantillaService.findById(id);
        if (horarioPlantilla.isPresent()) {
            return ResponseEntity.ok(horarioPlantilla.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<HorarioPlantilla>> getHorarioPlantillas() {
        List<HorarioPlantilla> horarioPlantillas = horarioPlantillaService.findAll();
        if (horarioPlantillas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(horarioPlantillas);
    }

    @GetMapping("/por-dia-semana")
    public ResponseEntity<List<HorarioPlantilla>> getTurnosPorDiaSemana(@RequestParam("dia") String dia) {
        DayOfWeek diaSemana;
        try {
            diaSemana = horarioPlantillaService.convertirDia(dia);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        List<HorarioPlantilla> horarios = horarioPlantillaService.findByDiaSemana(diaSemana);

        if (horarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(horarios);

    }


    @PostMapping
    public ResponseEntity<HorarioPlantilla> createHorarioPlantilla(@RequestBody HorarioPlantilla horarioPlantilla) {
        return ResponseEntity.ok(horarioPlantillaService.save(horarioPlantilla));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HorarioPlantilla> modifyHorarioPlantilla(@RequestBody HorarioPlantilla horarioPlantilla, @PathVariable Long id) {
        Optional<HorarioPlantilla> horarioP = horarioPlantillaService.findById(id);
        if (!horarioP.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        HorarioPlantilla h = horarioP.get();
        h.setDiaSemana(horarioPlantilla.getDiaSemana());
        h.setHora(horarioPlantilla.getHora());
        return ResponseEntity.ok(horarioPlantillaService.save(h));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HorarioPlantilla> deleteHorarioPlantilla(@PathVariable Long id) {
        Optional<HorarioPlantilla> horarioP = horarioPlantillaService.findById(id);
        if (!horarioP.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        horarioPlantillaService.delete(horarioP.get());
        return ResponseEntity.noContent().build();
    }
}
