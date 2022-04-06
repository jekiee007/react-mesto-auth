import React from "react";
import { Route, useHistory, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOped] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    React.useState();
  const [userEmail, setUserEmail] = React.useState("");

  const handleEditAvatarClick = () => {
    setIsAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOped(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOped(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getProfileInfo(), api.getCards()])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateUser = (data) => {
    api
      .setProfileInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  function signOut() {
    localStorage.removeItem("token");
    history.push("./sign-in");
  }

  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          history.push("/");
        }
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(false);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");

    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            const userEmail = res.data.email;

            setIsLoggedIn(true);
            setUserEmail(userEmail);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(true);
        history.push("/sign-in");
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userEmail={userEmail} signOut={signOut} />

          <Switch>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>

            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>

            <ProtectedRoute path="/" isLoggedIn={isLoggedIn}>
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>

            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />
        </div>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationSuccessful}
          onClose={closeAllPopups}
          messageSuccess={"Вы успешно зарегистрировались!"}
          messageFail={"Что-то пошло не так! Попробуйте ещё раз."}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
