import "../styles/SheduleList.css";

export default function SheduleList({ shedule, onDeleteShedule }) {
  return (
    <div className="shedule-group">
      <ul className="shedule-list">
        {shedule.length === 0 ? (
          <li className="shedule-alert">No hay horarios disponibles</li>
        ) : (
          shedule.map((item, index) => (
            <li className="shedule-item" key={item.id ?? index}>
              <p>{item.hora.slice(0, 5)}</p>  {/* para que muestre 19:00 */}
              <button
                onClick={() => onDeleteShedule(item.id)}
                className="btn-icon delete"
                title="Eliminar"
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}