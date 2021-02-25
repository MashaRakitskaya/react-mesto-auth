import logo from '../images/Vector.svg';

function Header({children}) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            {children}
        </header>
    );
}
export default Header;