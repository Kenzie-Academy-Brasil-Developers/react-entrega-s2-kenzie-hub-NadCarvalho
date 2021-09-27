import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Welcome from './Pages/Welcome';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const history = useHistory();

  const login = (user, token = null) => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
    if (user && token) {
      setLoggedIn({ user, token });
      history.push('/home');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedIn(null);
    history.push('/');
  };

  const updateUser = (user, token) => {
    if (user && token) {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedIn({ user, token });
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    console.log('STORED_DATA', storedUser, storedToken);
    if (storedToken && storedToken.length > 0 && storedToken !== 'null' && storedToken !== 'undefined') {
      login(JSON.parse(storedUser), JSON.parse(storedToken));
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/register">
          {loggedIn ? <Redirect to="/home" /> : <Register onRegister={login} />}
        </Route>
        <Route exact path="/home">
          {!loggedIn ? <Redirect to="/" /> : <Home onLogout={logout} updateUser={updateUser} loggedData={loggedIn}/>}
        </Route>
        <Route path="*">
          {loggedIn ? <Redirect to="/home" /> : <Welcome onLogin={login}/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
