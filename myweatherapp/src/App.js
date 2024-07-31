// import logo from './logo.svg';
import Weather from './components/weather';
import './App.css';
import bgimg from './images/weatherbg.gif'

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${bgimg})`, backgroundSize: '50%'}}>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <Weather />
    </div>
  );
}

export default App;
