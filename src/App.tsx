import './App.css';

import Calender from './Components/Calender';

function App() {
  const getDate = (date: string) => {
    console.log('Date', date);
  };
  return (
    <div>
      <Calender getDate={getDate} />
    </div>
  );
}

export default App;
