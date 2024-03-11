import logo from './logo.svg';
import './App.css';
import Nav  from './components/nav';
import { Outlet } from 'react-router';


function App() {
  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
