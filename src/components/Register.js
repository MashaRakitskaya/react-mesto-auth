// import Header from './Header.js';
import { Link } from 'react-router-dom';

function Register() {
    return(
        <>
        {/* <Header>
            <button className="header__login">Войти</button>
        </Header> */}
        <section className="sign-up">
            <div className="sign-up__content">
            <h3 className="sign-up__title">Регистрация</h3>
            <form className="sign-up__form" noValidate>
                <label className="sign-up__input-label" htmlFor="sign-up-email-input">
                    <input id='sign-up-email-input' className="sign-up__input sign-up__input_type_email" type="email" name="email" minLength="2"  maxLength="40" required />
                    <span id="sign-up-email-input-error" className="sign-up__input-error"></span>
                </label>
                <label className="sign-up__input-label" htmlFor="sign-up-password-input">
                    <input id='sign-up-password-input' className="sign-up__input sign-up__input_type_password" type="password" name="password" minLength="2"  maxLength="200" required />
                    <span id="sign-up-password-input-error" className="sign-up__input-error"></span>
                </label>
                <button type="submit" className="sign-up__save" value="Зарегистрироваться">Зарегистрироваться</button>
            </form>
            <p className="sign-up__already-registered">Уже зарегистрированы?<Link  className="sign-up__login" to="/sign-in"> Войти</Link></p>
            </div>
        </section>
        </>
    )
}
export default Register;