import { useEffect, useRef, useState } from "react";
import iconClose from "../images/close-icon.svg";

export default function InfoToolTip({
  isOpen,
  message: msg,
  type: tp,
  onClose,
}) {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const overlay = useRef();

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setMessage(msg);
  }, [msg]);

  useEffect(() => {
    setType(tp);
  }, [tp]);

  function close() {
    setMessage("");
    setType("");
    onClose();
  }

  function handleCloseClick() {
    close();
  }

  function handleCloseClickOverlay(e) {
    if (e.target === overlay.current) {
      close();
    }
  }

  return (
    <div
      className={`popup ${open ? "popup_opened" : "popup_closed"} popup_image`}
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
        {/* icone do tipo de mensagem */} {type}
        <h2 className="popup__title">{message}</h2>
      </div>
    </div>
  );
}
