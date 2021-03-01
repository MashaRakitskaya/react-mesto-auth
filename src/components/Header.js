import logo from '../images/Vector.svg';
import { Link, Route, Switch } from 'react-router-dom';
// import React from 'react';

// function Header({children}) {
//     return (
//         <header className="header">
//             <img className="header__logo" src={logo} alt="Логотип" />
//             {children}
//         </header>
//     );
// }
// export default Header;

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <Switch>
                {/* <Route>

                </Route> */}
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__registration">
                        Войти
                    </Link>
                </Route>

                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__login">
                        Регистрация
                    </Link>
                </Route>

            </Switch>
        </header>
    );
}
export default Header;