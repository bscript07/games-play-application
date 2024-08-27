import { Routes, Route } from 'react-router-dom';

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
import GameEdit from './components/game-edit/GameEdit';

function App() {

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                <Routes>
                    <Route path={Path.Home} element={<Home />} />
                    <Route path={Path.Games} element={<GameList />} />
                    <Route path={Path.CreateGame} element={<GameCreate />} />
                    <Route path={Path.Login} element={<Login />} />
                    <Route path={Path.Register} element={<Register />} />
                    <Route path={Path.GameDetails} element={<GameDetails />} />
                    <Route path={Path.Logout} element={<Logout />} />
                    <Route path={Path.GameEdit} element={<GameEdit />}></Route>
                </Routes>

            </div>
        </AuthProvider>
    )
}

export default App
