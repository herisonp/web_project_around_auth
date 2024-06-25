import { useEffect, useRef, useState } from "react";
import iconClose from "../images/close-icon.svg";

export default function ImagePopup({ card, onClose }) {
  const [selectedCard, setSelectedCard] = useState(card);
  const overlay = useRef();

  useEffect(() => {
    setSelectedCard(card);
  }, [card]);

  function close() {
    setSelectedCard({});
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
      className={`popup ${
        selectedCard.name ? "popup_opened" : "popup_closed"
      } popup_image`}
      ref={overlay}
      onClick={handleCloseClickOverlay}
    >
      <div className="popup__container popup__container_image">
        <button className="button popup__btn-close" onClick={handleCloseClick}>
          <img
            src={iconClose}
            alt="Ícone do botão de fechar popup"
            className="popup__close-icon"
          />
        </button>
        <img src={selectedCard.link} alt="" className="popup__image" />
        <p className="popup__image-title">{selectedCard.name}</p>
      </div>
    </div>
  );
}
