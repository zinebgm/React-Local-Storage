import logo from './logo.svg';
import './App.css';
import SetterComponent from './SetterComponent';
import ReceiverComponent from './ReceiverComponent';

function App() {
  return (
    <div className="App">
      <h1>LocalStorage Handler</h1>
      <SetterComponent/>
      <ReceiverComponent/>
    </div>
  );
}

export default App;
