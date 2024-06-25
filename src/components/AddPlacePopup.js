import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newPost = {
      name: formData.get("title").toString(),
      link: formData.get("image").toString(),
    };

    return onAddPlaceSubmit(newPost, form);
  }

  return (
    <PopupWithForm
      title="Novo local"
      name="add-place"
      buttonLabel="Criar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <div className="popup__input-control">
        <input
          type="text"
          id="title"
          name="title"
          className="popup__input popup__input_type_title"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error"></span>
      </div>
      <div className="popup__input-control">
        <input
          type="url"
          id="image"
          name="image"
          className="popup__input popup__input_type_image"
          placeholder="Link de imagem"
          minLength="15"
          required
        />
        <span className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
}
