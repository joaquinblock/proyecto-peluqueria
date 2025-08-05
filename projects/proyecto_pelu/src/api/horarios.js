// src/api/horarios.js

const BASE_URL = "http://localhost:8080/horarios";

export const getHorariosPorDia = async (dia) => {
    try {
        const res = await fetch(`${BASE_URL}/por-dia-semana?dia=${dia.toLowerCase()}`);
        if (res.status === 204) return []; // No hay horarios para ese día
        if (!res.ok) throw new Error("Error al obtener horarios");
        return await res.json();
    } catch (error) {
        console.error("Error al obtener horarios:", error);
        return [];
    }
};

export const deleteHorario = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/horarios/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Error al eliminar horario");
    } catch (error) {
        console.error("Error al eliminar horario:", error);
        throw error;
    }
};

export async function postHorario(horarioData) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(horarioData),
  });

  if (!response.ok) {
    throw new Error("Error al crear horario");
  }

  return await response.json(); // Retorna el horario creado
}

