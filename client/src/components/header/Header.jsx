import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';

export default function Header() {

    const { isAuthenticated, username } = useContext(AuthContext);

    return (
        <header>
            <h1><Link className="home" to="/">GamesPlay</Link></h1>
            <nav>

                {isAuthenticated && (
                <div id="user">
                    <span>{username}</span>
                    <Link to="/games">All games</Link>
                    <Link to="/games/create">Create Game</Link>
                    <Link to="/logout">Logout</Link>
                </div>
                )}

                {!isAuthenticated && ( 
                <div id="guest">
                    <Link to="/games">All games</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                )}

            </nav>
        </header>
    );
}
