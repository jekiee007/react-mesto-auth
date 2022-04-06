export const BASE_URL = "https://auth.nomoreparties.co";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // return res.json().then((data) => {
  //   const { statusCode } = data;
  //   const { message } = data.message[0].message[0];
  //   const error = new Error(message || "Что-то пошло не так");
  //   error.status = statusCode;
  //   throw error;
  // });
  return Promise.reject(`Error: ${res.status}`);
};

// };

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getContent = (headers) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${headers}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
