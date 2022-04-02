import React from "react";

export default function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__${props.name}`}>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name="popupForm" onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button className="popup__button" type="submit">
            {props.buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}
