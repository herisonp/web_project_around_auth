import { useEffect, useRef, useState } from "react";
import iconClose from "../images/close-icon.svg";
import iconSuccess from "../images/success-icon.svg";
import iconError from "../images/error-icon.svg";

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

  const typesIcon = {
    error: iconError,
    success: iconSuccess,
  };

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
        {typesIcon[type] && (
          <img src={typesIcon[type]} alt="" className="popup__info-icon" />
        )}
        <h2 className="popup__title popup__title-info">{message}</h2>
      </div>
    </div>
  );
}
