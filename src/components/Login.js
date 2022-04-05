import React, { useState } from "react";

function Login({ handleLogin }) {
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

    handleLogin(email, password).catch((err) => console.log(err));
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        className="auth__form"
        name="login"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className="auth__input auth__input_type_email"
          onSubmit={handleChange}
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
          name="password"
          type="password"
          id="password"
          placeholder="Пароль"
          required
        />
        {/* <span class="url-input-error"></span> */}
        <button
          className="auth__button popup__button_reg"
          type="submit"
          name="submit"
          value="Зарегистрироваться"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
