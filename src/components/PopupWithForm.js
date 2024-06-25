import { useEffect, useRef, useState } from "react";
import iconClose from "../images/close-icon.svg";
import { FormValidator, validateOptions } from "../utils/formValidator";

export default function PopupWithForm({
  children,
  isOpen,
  onClose,
  title,
  name,
  onSubmit,
  buttonLabel = "Salvar",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(isOpen);
  const form = useRef();
  const overlay = useRef();

  function close() {
    setOpen(false);
    onClose();
    form.current.reset();
    resetValidation();
  }

  function handleCloseClick() {
    close();
  }

  function handleCloseClickOverlay(e) {
    if (e.target === overlay.current) {
      close();
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    onSubmit(evt)
      .then(() => {
        form.current.reset();
        resetValidation();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function enableValidation() {
    new FormValidator({
      formElement: form.current,
      options: validateOptions,
    }).enableValidation();
  }

  function resetValidation() {
    new FormValidator({
      formElement: form.current,
      options: validateOptions,
    }).resetValidation();
  }

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    enableValidation();
  }, []);

  return (
    <div
      className={`popup ${
        open ? "popup_opened" : "popup_closed"
      }  popup_${name}`}
      ref={overlay}
      onClick={handleCloseClickOverlay}
    >
      <div className="popup__container">
        <button className="button popup__btn-close" onClick={handleCloseClick}>
          <img
            src={iconClose}
            alt="Ícone do botão de fechar popup"
            className="popup__close-icon"
          />
        </button>
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={handleSubmit}
          name={name}
          className={`popup__form popup__form_${name}`}
          ref={form}
        >
          {children && (
            <fieldset className="popup__fieldset">{children}</fieldset>
          )}
          <button type="submit" className="button popup__btn-submit">
            {isLoading ? "Carregando..." : buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
