import { useContext } from "react";
import imageFallback from "../images/avatar-fallback.png";

import iconEdit from "../images/edit-icon.svg";
import iconPlus from "../images/plus-icon.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main container">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <button
            className="button profile__btn-avatar-edit"
            onClick={onEditAvatarClick}
          >
            <img
              src={iconEdit}
              alt="Ícone do botão de editar avatar do perfil"
            />
          </button>
          <img
            src={currentUser.avatar ? currentUser.avatar : imageFallback}
            className="profile__avatar"
            alt="Imagem de avatar do usuário"
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              id="edit-profile"
              className="button profile__btn-edit popup-trigger"
              onClick={onEditProfileClick}
            >
              <img src={iconEdit} alt="Ícone do botão de editar perfil" />
            </button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          id="add-place"
          className="button profile__btn-add popup-trigger"
          onClick={onAddPlaceClick}
        >
          <img src={iconPlus} alt="Ícone do botão de adicionar novos posts" />
        </button>
      </section>

      <section className="posts">
        <ul className="posts__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
        {cards.length <= 0 && (
          <p className="posts__empty-text">Adicione seu primeiro post...</p>
        )}
      </section>
    </main>
  );
}
