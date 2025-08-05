import { useState } from "react";
import CheckIcono from "./CheckIcono";

export default function Servicio({ id, titulo, precio, idActivo, setIdActivo, setServicioSeleccionado}) {
  const activo = id === idActivo;
  const manejarClick = () => {
    setIdActivo(id);
    setServicioSeleccionado({ id, titulo, precio });
  };

  return (
    <div className={`servicio-card ${activo ? "activo" : ""}`} onClick={manejarClick}>
      <div>
        <h2 className={`servicio-nombre ${activo ? "activo" : ""}`}>{titulo}</h2>
        <p className={`servicio-precio ${activo ? "activo" : ""}`}>{precio}</p>
      </div>
      <div
        className={`servicio-icono ${activo ? "activo" : ""}`}
      >
      <CheckIcono></CheckIcono>
      </div>
    </div>
  );
}
