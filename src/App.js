import { Switch, Router } from 'react-router-dom';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Welcome from './Pages/Welcome';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Router exact path="/register" component={Register} />
        <Router exact path="/home" component={Home} />
        <Router path="*" component={Welcome} />
      </Switch>
    </div>
  );
}

export default App;
