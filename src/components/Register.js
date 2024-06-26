import { useEffect, useRef, useState } from "react";
import { withRouter, useHistory, Redirect, Link } from "react-router-dom";
import * as auth from "../utils/auth";
import { FormValidator, validateOptionsAuth } from "../utils/formValidator";

function Register({ loggedIn, handleInfoToolTip }) {
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

  async function handleSubmitRegister(evt) {
    evt.preventDefault();
    try {
      if (user.email === "" || user.password === "") {
        handleInfoToolTip({
          type: "error",
          message: "Preencha todas as informações para completar seu registro",
        });
        return;
      }

      const res = await auth.register(user);
      const { error, data } = await res.json();

      if (error) {
        throw new Error(error);
      }

      if (data) {
        resetValidation();
      }
      handleInfoToolTip(
        {
          type: "success",
          message: "Cadastro efetuado com sucesso! Faça seu login...",
        },
        () => {
          history.push("/login");
        }
      );
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
      <h2 className="auth__title">Insreva-se</h2>
      <form onSubmit={handleSubmitRegister} className="auth__form" ref={form}>
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
        <button className="auth__button">Insreva-se</button>
        <span className="auth__text">
          Já é um membro?{" "}
          <Link to="/login" className="auth__link">
            Faça o login aqui
          </Link>
        </span>
      </form>
    </section>
  );
}

export default withRouter(Register);
