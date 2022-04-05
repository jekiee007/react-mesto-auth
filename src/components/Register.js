import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleRegister(email, password).catch((err) => console.log(err));
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        className="auth__form"
        name="login"
        onChange={handleChange}
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className="auth__input auth__input_type_email"
          onSubmit={handleSubmit}
          onChange={handleChange}
          value={email}
          name="email"
          type="email"
          id="email"
          placeholder="Email"
          required
        />
        {/* <span className="title-input-error"></span> */}
        <input
          className="auth__input auth__input_type_password"
          onChange={handleChange}
          value={password}
          name="popupTypeURL"
          type="password"
          id="password"
          placeholder="Пароль"
          required
        />
        {/* <span className="url-input-error"></span> */}
        <button
          className="auth__button popup__button_reg"
          type="submit"
          name="submit"
          value="Зарегистрироваться"
        >
          Зарегистрироваться
        </button>
      </form>
    
      <p className="auth__login-tip">
        Уже зарегистрированы?{" "}
        <Link to={`./sign-in`} className="auth__login-link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
