import logo from "../images/logo-around.svg";

export default function Header() {
  return (
    <header className="header container">
      <img src={logo} className="header__logo" alt="Logo do site Around" />
    </header>
  );
}
