import { useEffect, useState } from 'react';
import {
  getServices,
} from "../api/servicios.js";
import { getHorariosPorDia} from "../api/horarios";
import Header from "../components/Header.jsx";
import Servicio from "../components/Servicio.jsx";
import Calendario from '../components/Calendario.jsx';
import Horarios from '../components/Horarios.jsx';
import Input from '../components/Input.jsx'
import '../styles/Calendario.css';
import "../styles/Servicio.css";
import '../styles/Header.css';
import '../styles/Horarios.css';
import '../styles/Home.css';


const Home = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [idActivo, setIdActivo] = useState(0);
  const [servicios, setServicios] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [turnoArmado, setTurnoArmado] = useState(null);
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];


  useEffect(() => {
    async function cargarServicios() {
      const data = await getServices();
      setServicios(data);
    }
    cargarServicios();
  }, []);

  //cargar horarios cuando cambia fechaSeleccionada
  useEffect(() => {
    const diaIndex = fechaSeleccionada.getDay();
    const diaNombre = dias[diaIndex]; 
    async function cargarHorarios() {
      try {
        const data = await getHorariosPorDia(diaNombre);
        setTurnos(data);
      } catch (error) {
        console.error("Error al cargar horarios:", error);
        setTurnos([]); // limpiar si falla
      }
    }
    cargarHorarios();
  }, [fechaSeleccionada]);

  useEffect(() => {
  if (servicioSeleccionado && fechaSeleccionada && turnoSeleccionado) {
    setTurnoArmado({
      servicio: servicioSeleccionado,
      fecha: fechaSeleccionada,
      hora: turnoSeleccionado,
    });
  } else {
    setTurnoArmado(null);
  }
}, [servicioSeleccionado, fechaSeleccionada, turnoSeleccionado]);

const settearTurno = () => {
   if(servicioSeleccionado === null){
      alert("Falta elegir servicio");
      return;
   }
   if(!fechaSeleccionada){
      alert("Falta elegir fecha");
      return;
   }
   console.log(turnoArmado);
}

  return (
    <>
      <Header textTitle="Reservar Turno" textSubtitle="𝕷𝖆𝖚𝖈𝖍𝖆 𝕾𝖙𝖚𝖉𝖎𝖔💈" />

      <main>
        <div className="home-section">
          <div className="container-servicios">
            <h2 className="titulo">Servicios</h2>
            <div className="servicio-lista">
              {servicios.map((servicio) => (
                <Servicio
                  key={servicio.id}
                  id={servicio.id}
                  titulo={servicio.nombre}
                  precio={servicio.precio}
                  idActivo={idActivo}
                  setIdActivo={setIdActivo}
                  setServicioSeleccionado={setServicioSeleccionado} 
                />
              ))}
            </div>
          </div>

          <div className="calendario-container">
            <h2 className="titulo">Seleccionar Día</h2>
            <Calendario value={fechaSeleccionada} onChange={setFechaSeleccionada} />
          </div>

          <div className="horarios-container">
            <h2 className="titulo">Seleccionar Hora</h2>
            <Horarios
              fechaSeleccionada={fechaSeleccionada}
              turnoSeleccionado={turnoSeleccionado}
              setTurnoSeleccionado={setTurnoSeleccionado}
              turnosDisponibles={turnos}
            />
          </div>
          <Input
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                      ></Input>
          <Input
                        type="text"
                        placeholder="Telefono (ej: 2284906788)"
                        name="telefono"
                      ></Input>
          <button onClick={settearTurno}>Reservar Turno</button>
        </div>
      </main>
    </>
  );
};

export default Home;