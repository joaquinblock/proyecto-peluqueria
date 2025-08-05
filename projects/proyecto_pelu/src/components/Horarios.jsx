import React from 'react';

const Horarios = ({ fechaSeleccionada, turnoSeleccionado, setTurnoSeleccionado, turnosDisponibles }) => {
  const turnos = turnosDisponibles || [];

  return (
    <>
      {turnos.length > 0 ? (
        <div className="grid-turnos">
          {turnos.map((turno) => (
            <button
              key={turno.id}
              className={`turno-btn ${turno.hora === turnoSeleccionado ? 'turno-btn--seleccionado' : ''}`}
              onClick={() => setTurnoSeleccionado(turno.hora)}
            >
              {turno.hora.slice(0, 5)}
            </button>
          ))}
        </div>
      ) : (
        <p className="no-turnos">No hay turnos disponibles este día.</p>
      )}
    </>
  );
};

export default Horarios;
