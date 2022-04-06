import React from 'react';
import logoMesto from "../images/logo__mesto.svg";
import { Link, Route } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header">
      <img src={logoMesto} alt="Лого место" className="header__logo" />
      <Route exact path="/">
        <ul className="header__list">
          <li className="header__list_item">{props.userEmail}</li>
          <li className="header__list_item">
            <button
              onClick={props.signOut}
              className="header__link header__button_sign-out"
            >
              Выйти
            </button>
          </li>
        </ul>
      </Route>

      <Route path="/sign-up">
        <Link to={`./sign-in`} className="header__link">
          Войти
        </Link>
      </Route>

      <Route path="/sign-in">
        <Link to={`./sign-up`} className="header__link">
          Регистрация
        </Link>
      </Route>
    </header>
  );
}
