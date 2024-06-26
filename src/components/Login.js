import { useEffect, useRef, useState } from "react";
import { withRouter, useHistory, Redirect, Link } from "react-router-dom";
import * as auth from "../utils/auth";
import { FormValidator, validateOptionsAuth } from "../utils/formValidator";

function Login({ handleLogin, loggedIn, handleInfoToolTip }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const form = useRef();

  function handleOnChange(evt) {
    evt.preventDefault();
    const key = evt.target.name;
    const value = evt.target.value;
    setUser((state) => ({
      ...state,
      [key]: value,
    }));
  }

  async function handleSubmitLogin(evt) {
    evt.preventDefault();
    try {
      if (user.email === "" || user.password === "") {
        handleInfoToolTip({
          type: "error",
          message: "Preencha todos os campos.",
        });
        return;
      }

      const res = await auth.login(user);
      const { message, token } = await res.json();

      if (message) {
        throw new Error(message);
      }

      if (token) {
        handleLogin();
        localStorage.setItem("jwt", token);
        history.push("/");
        resetValidation();
      }
    } catch (err) {
      handleInfoToolTip({
        type: "error",
        message: "Ops, algo saiu errado! Por favor, tente novamente.",
      });
      console.log("handleSubmitRegister Error", err);
    }
  }

  function resetValidation() {
    new FormValidator({
      formElement: form.current,
      options: validateOptionsAuth,
    }).resetValidation();
  }

  function enableValidation() {
    new FormValidator({
      formElement: form.current,
      options: validateOptionsAuth,
    }).enableValidation();
  }

  useEffect(() => {
    enableValidation();
  }, []);

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Entrar</h2>
      <form onSubmit={handleSubmitLogin} className="auth__form" ref={form}>
        <div className="auth__input-control">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={user.email}
            onChange={handleOnChange}
            className="auth__input"
            required
          />
          <span className="popup__error"></span>
        </div>
        <div className="auth__input-control">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={user.password}
            onChange={handleOnChange}
            className="auth__input"
            required
          />
          <span className="popup__error"></span>
        </div>
        <button className="auth__button">Entrar</button>
        <span className="auth__text">
          Ainda não é membro?{" "}
          <Link to="/register" className="auth__link">
            Inscreva-se aqui
          </Link>
        </span>
      </form>
    </section>
  );
}

export default withRouter(Login);
