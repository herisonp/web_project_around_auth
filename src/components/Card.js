import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `posts__trash-btn ${
    !isOwn && "posts__trash-btn_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `button posts__btn-like ${
    isLiked && "posts__btn-like_actived"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li key={card._id} className="posts__item">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="posts__image-wrapper">
        <img
          src={card.link}
          className="posts__image"
          alt={card.name}
          onClick={handleCardClick}
        />
      </div>
      <div className="posts__description">
        <h2 className="posts__title">{card.name}</h2>
        <div className="posts__like-group">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="posts__like-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
