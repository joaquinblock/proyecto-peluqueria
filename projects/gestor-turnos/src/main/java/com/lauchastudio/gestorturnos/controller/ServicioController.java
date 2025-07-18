package com.lauchastudio.gestorturnos.controller;

import com.lauchastudio.gestorturnos.model.Servicio;
import com.lauchastudio.gestorturnos.service.ServicioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servicios")
public class ServicioController {
    private final ServicioService servicioService;

    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> findById(@PathVariable Long id) {
        Optional<Servicio> servicio = servicioService.findServicioById(id);
        if (servicio.isPresent()) {
            return ResponseEntity.ok(servicio.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Servicio>> findAll() {
        List<Servicio> servicios = servicioService.findAllServicios();
        if(!servicios.isEmpty()){
            return ResponseEntity.ok(servicios);
        }else{
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping
    public ResponseEntity<Servicio> add(@RequestBody @Valid Servicio servicio) {
        servicioService.addServicio(servicio);
        return ResponseEntity.ok(servicio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servicio> update(@RequestBody Servicio servicio, @PathVariable Long id) {
        Optional<Servicio> s = servicioService.findServicioById(id);
        if (!s.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Servicio servicioUpdate = s.get();
        servicioUpdate.setNombre(servicio.getNombre());
        servicioUpdate.setPrecio(servicio.getPrecio());

        servicioService.addServicio(servicioUpdate);

        return ResponseEntity.ok(servicioUpdate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Servicio> servicio = servicioService.findServicioById(id);

        if (servicio.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        servicioService.deleteServicio(id);
        return ResponseEntity.noContent().build(); // 204: Eliminado con éxito, sin body
    }





}
