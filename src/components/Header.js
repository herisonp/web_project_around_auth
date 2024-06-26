import logo from "../images/logo-around.svg";
import { useHistory } from "react-router-dom";

export default function Header({ loggedIn, handleLogout }) {
  const history = useHistory();
  function handleClickLogout() {
    handleLogout();
    history.push("/login");
  }
  return (
    <header className="header container">
      <img src={logo} className="header__logo" alt="Logo do site Around" />
      <div style={{ color: "#FFF" }}>
        {loggedIn ? (
          <div>
            email
            <button onClick={handleClickLogout}>sair</button>
          </div>
        ) : (
          <span>Entrar / Registrar</span>
        )}
      </div>
    </header>
  );
}
