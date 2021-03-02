import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function Login({ onLogin }) {
    const initialData = {
        email: '',
        password: '',
    };
    const [data, setData] = useState(initialData);
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(data => ({
          ...data,
          [name]: value,
        }));
    };

    const handleSubmit =  (event) => {
        event.preventDefault();

        if (!data.email || !data.password) {
            return;
        }

        onLogin(data)
        // .then(resetForm)
        .then(() => history.push('/main'))
        // .catch(err => setMessage(err.message || 'Что-то пошло не так'))
    };

    return(
        <>
        <section className="login">
            <div className="login__content">
            <h3 className="login__title">Вход</h3>
            <form onSubmit={handleSubmit} className="login__form" noValidate>
                <label className="login__input-label" htmlFor="login-email-input">
                    <input
                        value={data.email}
                        id='login-email-input'
                        className="login__input login__input_type_email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                    />
                    <span id="login-email-input-error" className="login__input-error"></span>
                </label>
                <label className="login__input-label" htmlFor="login-password-input">
                    <input
                        value={data.password}
                        id='login-password-input'
                        className="login__input login__input_type_password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />
                    <span id="login-password-input-error" className="login__input-error"></span>
                </label>
                <button type="submit" className="login__save" value="Зарегистрироваться">Войти</button>
            </form>
            </div>
        </section>
        </>
    )
}
export default Login;