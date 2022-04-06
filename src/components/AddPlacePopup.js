import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardTitle, setCardTitle] = React.useState("");
  const [cardURL, setCardURL] = React.useState("");

  React.useEffect(() => {
    setCardTitle("");
    setCardURL("");
  }, [isOpen]);

  function handleClose() {
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
          name: cardTitle,
          link: cardURL,
    })
  }

  function handleCardTitle(e){
    setCardTitle(e.target.value);
  }

  function handleCardURL(e){
    setCardURL(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card-editor"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_title"
            name="title"
            type="text"
            id="title-input"
            onChange={handleCardTitle}
            value={cardTitle}
            minLength="2"
            maxLength="30"
            placeholder="Название"
            pattern="^[a-zA-Zа-яА-я-\s]+$"
            required
          />
          <span className="title-input-error"></span>
          <input
            className="popup__input popup__input_type_url"
            name="popupTypeURL"
            onChange={handleCardURL}
            value={cardURL}
            type="url"
            id="url-input"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="url-input-error"></span>
        </>
      }
    ></PopupWithForm>
  );
}
