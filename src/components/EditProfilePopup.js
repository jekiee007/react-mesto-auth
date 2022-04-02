import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameUpdate(e) {
    setName(e.target.value);
  }

  function handleDescriptionUpdate(e) {
    setDescription(e.target.value);
  }

  function handleClose() {
    onClose();
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-editor"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_name"
            name="popupTypeName"
            placeholder="Имя"
            type="text"
            id="popupTypeName-input"
            minLength="2"
            maxLength="40"
            pattern="^[a-zA-Zа-яА-я-\s]+$"
            onChange={handleNameUpdate}
            value={name}
            required
          />
          <span className="popupTypeName-input-error"></span>
          <input
            className="popup__input popup__input_type_job"
            name="popupTypeJob"
            placeholder="Работа"
            type="text"
            id="popupTypeJob-input"
            minLength="2"
            maxLength="200"
            pattern="^[a-zA-Zа-яА-я-\s]+$"
            onChange={handleDescriptionUpdate}
            value={description}
            required
          />
          <span className="popupTypeJob-input-error"></span>
        </>
      }
    ></PopupWithForm>
  );
}
