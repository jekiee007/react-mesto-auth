import logoMesto from "../images/logo__mesto.svg";

export default function Header(){
    return (
<header className="header">
        <img
          src={logoMesto}
          alt="Лого место"
          className="header__logo"
        />
      </header>
    );
}
