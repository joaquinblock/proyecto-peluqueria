import { useState } from "react";
import { agregarServicio } from "../data/servicioAPI";

export default function FormCreate({ actualizarServicios }) {
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación mínima
    if (!titulo.trim() || !precio.trim()) {
      alert("Completa ambos campos.");
      return;
    }

    agregarServicio(titulo, `$${precio}`); // Llamás a la función externa
    actualizarServicios(); // Pedís a App que actualice la lista

    // Limpiar campos
    setTitulo("");
    setPrecio("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-create">
      <input
        type="text"
        placeholder="Nombre del servicio"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}


