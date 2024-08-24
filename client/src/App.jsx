import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as authService from './services/authService';
import { AuthProvider } from './context/authContext';
import Path from './paths';

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import GameList from './components/game-list/GameList';
import GameCreate from './components/game-create/GameCreate';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Register from './components/register/Register';
import GameDetails from './components/game-details/GameDetails';

function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(() => {
        localStorage.removeItem('accessToken');

        return {};
    });

    const loginSubmitHandler = async (values) => {
       const result = await authService.login(values.email, values.password);

       setAuth(result);
       localStorage.setItem('accessToken', result.accessToken);
       navigate(Path.Home);
    }

    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values.email, values.password);

        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);
        navigate(Path.Home);
    }

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
    }

    return (
        <AuthProvider value={values}>
        <div id="box">
            <Header />

            <Routes>
                <Route path={Path.Home} element={<Home />} />
                <Route path={Path.Games} element={<GameList />} />
                <Route path={Path.CreateGame} element={<GameCreate />} />
                <Route path={Path.Login} element={<Login />} />
                <Route path={Path.Register} element={<Register  />} />
                <Route path={Path.GameDetails} element={<GameDetails /> } />
                <Route path={Path.Logout} element={<Logout />} />
            </Routes>
        </div>
        </AuthProvider>
    )
}

export default App
