import React from "react";
// import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img
          src={currentUser.avatar}
          alt="Фото профиля"
          className="profile__avatar"
        />
        <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
        <div className="profile-info">
          <h1 className="profile-info__name">{currentUser.name}</h1>
          <button
            className="profile-info__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile-info__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="places">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
