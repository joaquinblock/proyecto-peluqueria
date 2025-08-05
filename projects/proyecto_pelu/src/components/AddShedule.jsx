import React, { useState } from "react";
import "../styles/AddShedule.css";

function AddShedule({ setAddHour, setAddDay, settear }) {

    const [dia, setDia] = useState("");
    const [hora, setHora] = useState("");
    const dias = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    const changeDay = (e) => {
        const selectedDay = e.target.value;
        setDia(selectedDay);
        setAddDay(selectedDay);
    };

    const changeHour = (e) => {
        const selectedHour = e.target.value;
        setHora(selectedHour);
        setAddHour(selectedHour);
    };

    return (
        <div className="shedule-add">
            <h3>Agregar Horario</h3>
            <div className="shedule-add-group">
                <div className="shedule-inputs-group">
                    <div className="shedule-day-group">
                        <span>Día </span>
                        <select value={dia} onChange={changeDay}>
                            <option value="" disabled>
                                Selecciona un día
                            </option>
                            {dias.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="shedule-hour-group">

                        <span>Horario </span>
                        <input
                            type="time"
                            value={hora}
                            onChange={changeHour}
                        />

                    </div>
                </div>
                <button
                    className="button-add-shedule"
                    onClick={() => {
                        if (!dia && !hora){
                            alert("Por favor completa ambos campos");
                            return;
                        }
                        if (!dia) {
                            alert("Por favor seleccioná un día.");
                            return;
                        }
                        if (!hora) {
                            alert("Por favor seleccioná una hora.");
                            return;
                        }
                        settear(dia, hora);
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default AddShedule;