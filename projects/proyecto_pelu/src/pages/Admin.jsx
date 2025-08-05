
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getServices,
    addService,
    updateService,
    deleteService
} from "../api/servicios.js";
import { getHorariosPorDia, deleteHorario, postHorario } from "../api/horarios";
import Header from "../components/Header.jsx";
import Input from "../components/Input.jsx";
import ServiceItem from "../components/ServiceItem.jsx";
import SheduleButton from "../components/SheduleButton.jsx";
import SheduleList from "../components/SheduleList.jsx";
import AddShedule from "../components/AddShedule.jsx";
import '../styles/Admin.css';


export default function Admin() {
    const navigate = useNavigate();

    const [services, setServices] = useState([]);
    const [nombreServicio, setNombreServicio] = useState("");
    const [precio, setPrecio] = useState("");
    const [editando, setEditando] = useState(false);
    const [servicioEditado, setServicioEditado] = useState(null);
    const [diaSeleccionado, setDiaSeleccionado] = useState("");
    const [botonSeleccionado, setBotonSeleccionado] = useState(0);
    const [horariosDelDia, setHorariosDelDia] = useState([]);
    const [addHour, setAddHour] = useState("");
    const [addDay, setAddDay] = useState("");
    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    const mapDias = {
        "Lunes": "MONDAY",
        "Martes": "TUESDAY",
        "Miércoles": "WEDNESDAY",
        "Jueves": "THURSDAY",
        "Viernes": "FRIDAY",
        "Sábado": "SATURDAY",
        "Domingo": "SUNDAY"
    };
    //==========GET SERVICIOS=============
    useEffect(() => {
        cargarServicios();
    }, []);

    const cargarServicios = async () => {
        const data = await getServices();
        setServices(data);
    };


    //==========POST SERVICIOS=============
    const postService = async () => {
        try {
            await addService(nombreServicio, precio);
            await cargarServicios();
            setNombreServicio("");
            setPrecio("");
        } catch (error) {
            alert(error.message);
        }
    };

    //==========PUT SERVICIOS================
    //la parte que muestra los inputs llenos cuando apretas en el lapiz
    const editService = async (id, nombre, precio) => {
        setEditando(true);
        setServicioEditado({ id, nombre, precio });
        setNombreServicio(nombre);
        setPrecio(precio);
    };

    const cancelarEdicion = () => {
        setEditando(false);
        setServicioEditado(null);
        setNombreServicio("");
        setPrecio("");
    };

    const putService = async () => {
        try {
            await updateService(servicioEditado.id, nombreServicio, precio);
            setEditando(false);
            setNombreServicio("");
            setPrecio("");
            await cargarServicios();
        } catch (error) {
            alert(error.message);
        }
    };

    //==========DELETE SERVICIOS=============
    const removeService = async (id) => {
        try {
            await deleteService(id);
            await cargarServicios();
        } catch (error) {
            alert(error.message);
        }
    };

    const mostrarBoton = async (dia) => {
        setDiaSeleccionado(dia);
        const horarios = await getHorariosPorDia(dia);
        console.log(horarios);
        if (horarios.length > 0) {
            setHorariosDelDia(horarios);
        } else {
            setHorariosDelDia([]);
        }
    };

    const seleccionarBoton = (num) => {
        setBotonSeleccionado(num);
    }

    const onDeleteShedule = async (id) => {
        console.log(id);
        try {
            await deleteHorario(id);
            // recargar los horarios del día actual
            mostrarBoton(diaSeleccionado);
        } catch (error) {
            alert("No se pudo eliminar el horario.");
        }
    };


    const settear = async (day, hour) => {
        try {
            setAddDay(day);
            setAddHour(hour);

            const diaEnIngles = mapDias[day] || day; // Si no encuentra, deja el mismo

            const nuevoHorario = {
            diaSemana: diaEnIngles,
            hora: hour,
            };

            const data = await postHorario(nuevoHorario);

            console.log("Horario guardado con éxito:", data);
        } catch (error) {
            console.error("Error al guardar horario:", error);
        }
    };

    return (
        <>
            <Header textTitle="Modificar" textSubtitle="𝕷𝖆𝖚𝖈𝖍𝖆 𝕾𝖙𝖚𝖉𝖎𝖔💈" />
            <main>
                <div className="tabs">
                    <button
                        className={`tab ${botonSeleccionado === 1 ? " active" : ""}`}
                        onClick={() => seleccionarBoton(1)}
                    >
                        📅 Horarios
                    </button>

                    <button
                        className={`tab ${botonSeleccionado === 0 ? " active" : ""}`}
                        onClick={() => seleccionarBoton(0)}
                    >
                        💼 Servicios
                    </button>
                </div>

                <div className="admin-section">
                    {botonSeleccionado === 1 && (
                        <div className="shedule-section">
                            <h3>Planilla semanal</h3>
                            <AddShedule settear={settear} setAddDay={setAddDay} setAddHour={setAddHour}></AddShedule>
                            <div className="days-group">
                                {dias.map((dia) => (
                                    <SheduleButton key={dia} day={dia} mostrarBoton={mostrarBoton} />
                                ))}
                                {diaSeleccionado && (
                                    <SheduleList shedule={horariosDelDia} onDeleteShedule={onDeleteShedule} />
                                )}
                            </div>

                        </div>
                    )}

                    {botonSeleccionado === 0 && (
                        <div className="service-section">
                            <h3>Lista de servicios</h3>
                            <ul className="service-list">
                                {services.map((services) => (
                                    <ServiceItem
                                        key={services.id}
                                        id={services.id}
                                        name={services.nombre}
                                        price={services.precio}
                                        onDelete={removeService}
                                        onEdit={editService}
                                    />
                                ))}
                            </ul>
                            <div className="add-service-section">
                                <h4>{editando ? "Modificar Servicio" : "Agregar Servicio"}</h4>
                                <div className="inputs-group">
                                    <Input
                                        type="text"
                                        placeholder="Nombre de servicio"
                                        value={nombreServicio}
                                        onChange={(e) => setNombreServicio(e.target.value)}
                                        name="nombreServicio"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Precio"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                        name="precio"
                                    />
                                </div>
                                {editando ? (
                                    <>
                                        <div className="edit-buttons">
                                            <button className="btn-edit" onClick={() => putService(servicioEditado.id, nombreServicio, precio)}>
                                                Modificar
                                            </button>
                                            <button className="btn-cancel" onClick={cancelarEdicion}>Cancelar</button>
                                        </div>
                                    </>
                                ) : (
                                    <button className="btn-add" onClick={() => postService(nombreServicio, precio)}>Agregar</button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>

        </>
    );
}