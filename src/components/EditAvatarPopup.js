import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleClose() {
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="card-editor"
      buttonName="Обновить"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_url"
            name="popupTypeURL"
            type="url"
            id="avatar-url-input"
            placeholder="Ссылка на аватар"
            ref={avatarRef}
            required
          />
          <span className="avatar-url-input-error"></span>
        </>
      }
    ></PopupWithForm>
  );
}
