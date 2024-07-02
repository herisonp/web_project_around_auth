import { useContext } from "react";
import logo from "../images/logo-around.svg";
import { useHistory, Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Header({ loggedIn, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();
  const { pathname } = useLocation();

  const links = {
    "/login": {
      to: "/register",
      label: "Inscreva-se",
    },
    "/register": {
      to: "/login",
      label: "Fazer login",
    },
  };

  function handleClickLogout() {
    handleLogout();
    history.push("/login");
  }

  return (
    <header className="header container">
      <img src={logo} className="header__logo" alt="Logo do site Around" />
      <div className="header__infos">
        {loggedIn ? (
          <>
            <span>{currentUser?.email}</span>
            <button className="header__btn-logout" onClick={handleClickLogout}>
              sair
            </button>
          </>
        ) : (
          <Link
            to={links[pathname] ? links[pathname].to : links["/register"].to}
            className="header__link"
          >
            {links[pathname] ? links[pathname].label : links["/register"].label}
          </Link>
        )}
      </div>
    </header>
  );
}
