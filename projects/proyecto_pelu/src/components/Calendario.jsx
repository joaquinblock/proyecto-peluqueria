import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendario = ({ onChange, value }) => {

  return (
    
      <Calendar
      onChange={onChange}
      value={value}
      />
  );
};

export default Calendario;
