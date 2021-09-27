import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Welcome from './Pages/Welcome';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const history = useHistory();

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedIn(user);
    history.push('/home');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    if (storedUser && storedUser.length > 0 && storedUser !== 'null') {
      login(JSON.parse(storedUser));
    }
  });

  return (
    <div className="App">
      <Switch>
        <Route exact path="/register">
          {loggedIn ? <Redirect to="/home" /> : <Register onRegister={login} />}
        </Route>
        <Route exact path="/home">
          {!loggedIn ? <Redirect to="/" /> : <Home/>}
        </Route>
        <Route path="*">
          {loggedIn ? <Redirect to="/home" /> : <Welcome onLogin={login}/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
