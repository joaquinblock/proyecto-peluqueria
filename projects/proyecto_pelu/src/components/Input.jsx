

export default function Input(props) {
    return (
        <>
            <input className="input-field"
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
            />
        </>      
    );
}