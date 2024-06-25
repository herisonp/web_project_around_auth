import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const link = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    return onUpdateAvatar({
      avatar: link.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Alterar a foto do perfil"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-control">
        <input
          type="url"
          id="link"
          name="link"
          className="popup__input popup__input_type_link"
          placeholder="Insira a url da imagem..."
          minLength="2"
          ref={link}
          required
        />
        <span className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
}
