// react and libs
import { useEffect, useState } from "react";

// utils
import api from "../utils/api";

// components
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// poups components
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

// contexts
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";

function App() {
  // popup states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);

  // cards states
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardDelete, setSelectedCardDelete] = useState({});
  const [cards, setCards] = useState([]);

  // current user state
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getInitialCardsData();
    getUserInfo();
  }, []);

  // user method
  function getUserInfo() {
    api.getUserInfo().then(setCurrentUser).catch(console.log);
  }

  // cards methods
  function getInitialCardsData() {
    api.getInitialCards().then(setCards).catch(console.log);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.log);
  }
  function handleCardDelete(card) {
    return api
      .deleteCardById(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.log);
  }

  // popups methods
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleConfirmationClick(card) {
    setIsConfirmationPopupOpen(true);
    setSelectedCardDelete(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
    setSelectedCardDelete({});
  }

  // submits methods
  function handleUpdateUser(user) {
    return api
      .editUser(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.log);
  }
  function handleUpdateAvatar(user) {
    return api
      .editAvatar({ avatar: user.avatar })
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          avatar: data.avatar,
        });
        closeAllPopups();
      })
      .catch(console.log);
  }
  function handleAddPlaceSubmit(post, form) {
    return api
      .postCard(post)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
        form.reset();
      })
      .catch(console.log);
  }
  function handleConfirmationSumit() {
    return handleCardDelete(selectedCardDelete).then(() => {
      setSelectedCardDelete({});
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onCardClick={handleCardClick}
          onCardDelete={handleConfirmationClick}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onConfirmationSubmit={handleConfirmationSumit}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
