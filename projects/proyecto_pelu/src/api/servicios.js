const BASE_URL = "http://localhost:8080";

export async function getServices() {
    try {
        const res = await fetch(`${BASE_URL}/servicios`);
        if (!res.ok) throw new Error("Error al obtener servicios");

        const text = await res.text();
        const data = text ? JSON.parse(text) : [];

        return data.length === 0
            ? [
                { id: 1, nombre: "Corte", precio: 12000 },
                { id: 2, nombre: "Corte y Barba", precio: 15000 },
              ]
            : data;
    } catch (error) {
        console.error(error);
        return [
            { id: 1, nombre: "Corte", precio: 12000 },
            { id: 2, nombre: "Corte y Barba", precio: 15000 },
        ];
    }
}

export async function addService(nombre, precio) {
    const nuevoServicio = {
        nombre: nombre,
        precio: parseFloat(precio),
    };

    const res = await fetch(`${BASE_URL}/servicios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoServicio),
    });

    if (!res.ok) throw new Error("Error al agregar servicio");
}

export async function updateService(id, nombre, precio) {
    const servicioActualizado = {
        nombre: nombre,
        precio: parseFloat(precio),
    };

    const res = await fetch(`${BASE_URL}/servicios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicioActualizado),
    });

    if (!res.ok) throw new Error("Error al modificar servicio");
}

export async function deleteService(id) {
    const res = await fetch(`${BASE_URL}/servicios/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar servicio");
}
