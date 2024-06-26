// react and libs
import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  withRouter,
  useHistory,
  Redirect,
} from "react-router-dom";

// utils
import api from "../utils/api";
import * as auth from "../utils/auth";

// components
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
// poups components
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import AddPlacePopup from "./AddPlacePopup";

// contexts
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoToolTip from "./InfoToolTip";

function App() {
  // popup states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [infoToolTipPopup, setInfoToolTipPopup] = useState({
    type: "",
    message: "",
    isOpen: false,
    onClose: () => {},
  });

  // cards states
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardDelete, setSelectedCardDelete] = useState({});
  const [cards, setCards] = useState([]);

  // current user state
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getInitialCardsData();
    getUserInfo();
    handleCkeckToken();
  }, []);

  async function handleCkeckToken() {
    const token = localStorage.getItem("jwt");

    if (!token) {
      handleLogout();
      return;
    }

    const res = await auth.checkToken(token);
    const { data } = await res.json();
    if (!data) {
      handleLogout();
      return;
    }
    handleLogin();
  }

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
  function handleInfoToolTipPopup({ type, message }, onClose) {
    const infos = {
      type,
      message,
      isOpen: true,
      onClose: () => {},
    };

    if (onClose) {
      infos.onClose = onClose;
    }

    setInfoToolTipPopup(infos);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setInfoToolTipPopup({
      type: "",
      message: "",
      isOpen: false,
      onClose: () => {},
    });
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

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} handleLogout={handleLogout} />
        <main className="main container">
          <Switch>
            <Route path="/login">
              <Login
                handleLogin={handleLogin}
                loggedIn={loggedIn}
                handleInfoToolTip={handleInfoToolTipPopup}
              />
            </Route>
            <Route path="/register">
              <Register
                loggedIn={loggedIn}
                handleInfoToolTip={handleInfoToolTipPopup}
              />
            </Route>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Main
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onEditProfileClick={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardDelete={handleConfirmationClick}
                onCardLike={handleCardLike}
                cards={cards}
              />
            </ProtectedRoute>
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </main>

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

      <InfoToolTip
        type={infoToolTipPopup.type}
        message={infoToolTipPopup.message}
        isOpen={infoToolTipPopup.isOpen}
        onClose={() => {
          infoToolTipPopup.onClose();
          closeAllPopups();
        }}
      />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
