import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

import { pathToUrl } from '../../utils/pathUtils';
import Path from '../../paths';

import AuthContext from "../../context/authContext";
import useForm from '../../hooks/useForm';

export default function GameDetails() {
    const { email, userId } = useContext(AuthContext);
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const { gameId } = useParams();

    const commentRef = useRef();

    useEffect(() => {
        gameService.getOne(gameId)
            .then(setGame);

        commentService.getAll(gameId)
            .then(setComments);
    }, [gameId]);

    const addCommentHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const newComment = await commentService.create(
            gameId,
            formData.get('comment')
        );

        setComments(state => [...state, { ...newComment, owner: { email } }]);

        if (commentRef.current) {
            commentRef.current.value = '';
        }
    }

    const deleteHandler = async () => {
        await gameService.deletePost(gameId);
        window.location.href = Path.Home;
    };

    const initialValues = useMemo(() => ({
        comment: ''
    }), []);

    // const { values, onChange, onSubmit } = useForm(addCommentHandler, initialValues);

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.map(({ _id, text, owner: { email } }) => (
                            <li key={_id} className="comment">
                                <p>{email}: {text}</p>
                            </li>
                        ))}
                    </ul>

                    {comments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {userId === game._ownerId && (
                    <div className="buttons">
                        <Link to={pathToUrl(Path.GameEdit, { gameId })} className="button">Edit</Link>
                        <button onClick={deleteHandler} className="button">Delete</button>
                    </div>
                )}

            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <textarea ref={commentRef} name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
        </section>
    );
}
