import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ 
  card, 
  onCardClick, 
  onCardLike,
  onCardDelete,
 }) {
  
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick(){
    onCardLike(card);
  }

  function handleDeleteClick(){
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `card__remove ${
    isOwn ? "card__remove" : ""
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like card__like_active" : "card__like"
  }`;

 

  return (
    <div className="card">
      <button 
      type="button" 
      className={cardDeleteButtonClassName}
      onClick={handleDeleteClick}></button>
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__place-options">
        <h2 className="card__place-name">{card.name}</h2>
        <div className="card__button-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like_counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
