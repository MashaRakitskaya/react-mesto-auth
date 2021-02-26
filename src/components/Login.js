import Header from './Header.js';

function Login() {
    return(
        <>
        <Header>
            <button className="header__registration">Регистрация</button>
            {/* <Link to="/sign-in" className="header__login">Войти</Link> */}
        </Header>
        <section className="login">
            <div className="login__content">
            <h3 className="login__title">Вход</h3>
            <form className="login__form" noValidate>
                <label className="login__input-label" htmlFor="login-email-input">
                    <input id='login-email-input' className="login__input login__input_type_email" type="email" name="email" minLength="2"  maxLength="40" required />
                    <span id="login-email-input-error" className="login__input-error"></span>
                </label>
                <label className="login__input-label" htmlFor="login-password-input">
                    <input id='login-password-input' className="login__input login__input_type_password" type="password" name="password" minLength="2"  maxLength="200" required />
                    <span id="login-password-input-error" className="login__input-error"></span>
                </label>
                <button type="submit" className="login__save" value="Зарегистрироваться">Войти</button>
            </form>
            {/* <p className="login__already-registered">Уже зарегистрированы?<a className="sign-up__login" href="#" target="_blank"> Войти</a></p> */}
            </div>
        </section>
        </>
    )
}
export default Login;