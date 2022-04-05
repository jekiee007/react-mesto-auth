import React from "react";
import registrationSuccessImage from "../images/registration__success.svg";
import registrationFailImage from "../images/registration__fail.svg";

export default function InfoToolTip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__reg">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__info">
          <img
            alt=""
            src={
              props.isSuccess ? registrationSuccessImage : registrationFailImage
            }
            className="popup__info_image"
          />
          <h2 className="popup__info_title">
            {props.isSuccess
              ? props.onSuccessRegMessage
              : props.onFailRegMessage}
          </h2>
        </div>
      </div>
    </div>
  );
}