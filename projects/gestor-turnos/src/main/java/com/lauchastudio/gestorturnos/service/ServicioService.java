package com.lauchastudio.gestorturnos.service;

import com.lauchastudio.gestorturnos.model.Servicio;
import com.lauchastudio.gestorturnos.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public Optional<Servicio> findServicioById(Long id) {
        return servicioRepository.findById(id);
    }

    public List<Servicio> findAllServicios() {
        return servicioRepository.findAll();
    }

    public Servicio addServicio(Servicio servicio) { //update tambien
        return servicioRepository.save(servicio);
    }

    public void deleteServicio(Long id) {
        servicioRepository.deleteById(id);
    }
}
