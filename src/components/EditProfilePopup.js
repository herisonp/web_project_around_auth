import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleOnChangeName(e) {
    setName(e.target.value);
  }

  function handleOnChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    return onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Editar perfil"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-control">
        <input
          type="text"
          id="name"
          name="name"
          className="popup__input popup__input_type_name"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          defaultValue={name}
          onChange={handleOnChangeName}
          required
        />
        <span className="popup__error"></span>
      </div>
      <div className="popup__input-control">
        <input
          type="text"
          id="about"
          name="about"
          className="popup__input popup__input_type_about"
          placeholder="Sobre mim"
          minLength="2"
          maxLength="200"
          defaultValue={description}
          onChange={handleOnChangeDescription}
          required
        />
        <span className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
}
