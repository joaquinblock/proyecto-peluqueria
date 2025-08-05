import '../styles/ServiceItem.css';

function ServiceItem(service){
    return(
        <>
            <li key={service.id} className="service-item">
                <div className="service-details">
                  <span className="service-name">{service.name}</span>
                  <span className="service-price">${service.price}</span>
                </div>
                <div className="service-actions">
                    <button onClick={() => service.onEdit(service.id, service.name, service.price)} className="btn-icon edit" title="Editar">✏️</button>
                    <button  onClick={() => service.onDelete(service.id)} className="btn-icon delete" title="Eliminar">🗑️</button>
                </div>
            </li>
        </>
    )
} export default ServiceItem;