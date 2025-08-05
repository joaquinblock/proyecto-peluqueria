import "../styles/SheduleButton.css";

export default function SheduleButton({day, mostrarBoton}){
    return(
        <>
            <button className="button-day" onClick={() => mostrarBoton(day)}>{day}</button>
        </>
    )
}