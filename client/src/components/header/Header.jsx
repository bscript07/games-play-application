import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import Path from '../../paths';
export default function Header() {

    const { isAuthenticated, username } = useContext(AuthContext);

    return (
        <header>
            <h1><Link className="home" to={Path.Home}>GamesPlay</Link></h1>
            <nav>

                {isAuthenticated && (
                <div id="user">
                    <span>{username}</span>
                    <Link to={Path.Games}>All games</Link>
                    <Link to={Path.CreateGame}>Create Game</Link>
                    <Link to={Path.Logout}>Logout</Link>
                </div>
                )}

                {!isAuthenticated && ( 
                <div id="guest">
                    <Link to={Path.Games}>All games</Link>
                    <Link to={Path.Login}>Login</Link>
                    <Link to={Path.Register}>Register</Link>
                </div>
                )}

            </nav>
        </header>
    );
}
