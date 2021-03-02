import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { useState, useEffect, useCallback } from 'react';
import api from "../utils/api";
import { CurrentUserContext }  from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from '../utils/auth.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isBigPhotoPopupOpen, setIsBigPhotoPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    const initialData = {
        email: '',
        password: '',
    };
    const [data, setData] = useState(initialData);
    
    const [userEmail, setUserEmail] = useState(data.email);
    

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    };
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    };

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsBigPhotoPopupOpen(true);
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsBigPhotoPopupOpen(false);
        setSelectedCard({});
    };

    function closeByOverlay(event) { 
        if (event.target.classList.contains('popup')) {
            closeAllPopups()
        }
    };

    useEffect(() => {
        api.getUserInformation()
        .then((result) => {
            // console.log(result);
            setCurrentUser(result);
            
        })
        .catch(err => console.log(`Ошибка получения информации${err}`));
    },[]);
    
    useEffect(() => {
        api.getInitialCards()
        .then((result) =>{
            // console.log(result)
            setCards(result)
        })
        .catch(err => console.log(`Ошибка получения информации${err}`));
    },[]);

    function handleUpdateUser({name, about}) {
        api.addUserInfo({name: name, about: about})
        .then((result) => {
            // console.log(result);
            setCurrentUser(result);
            closeAllPopups();
        })
        .catch(err => console.log(`Ошибка отправки информации${err}`))
        
    };

    function handleUpdateAvatar({avatar}) {
        api.addUserAvatar({avatar: avatar})
        .then((result) => {
            // console.log(result);
            setCurrentUser(result);
            closeAllPopups();
        })
        .catch(err => console.log(`Ошибка отправки информации${err}`))
    };

    function handleAddPlaceSubmit({name, link}) {
        api.addCard({name: name, link: link})
        .then((result) => {
            // console.log(result);
            setCards([result, ...cards]);
            closeAllPopups();
        })
        .catch(err => console.log(`Ошибка отправки информации${err}`))
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            // console.log(newCard);
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        })
        .catch(err => console.log(`Ошибка отправки информации${err}`))
    };

    function handleCardDelete(card) {
        api.removeCard(card._id)
        .then((newCard) => {
            // console.log(newCard);
            // console.log(newCard);
            const removeCard = cards.filter((c) => c._id !== card._id);
            setCards(removeCard);
        })
        .catch(err => console.log(`Ошибка отправки информации${err}`))
    };

    const handleRegister = ({ email, password }) => {
        return auth.register(email, password)
        .then((result) => {
            if (!result || result.statusCode === 400) throw new Error('Что-то пошло не так');
            return result;
        })
    };

    const handleLogin = ({ email, password }) => {
        return auth.authorize(email, password)
        .then((result) => {
            if (!result || result.statusCode === 400) throw new Error('Что-то пошло не так');
            if (result.token) {
                setLoggedIn(true);
                setData({ 
                    email: result.email,
                    password: result.password
                })
                localStorage.setItem('token', result.token);
            }
        })
        
    };

    const handleTokenCheck = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            auth.getContent(token)
            .then((result) => {
            if (result) {
                setLoggedIn(true)
                // setData({ email: result.email })
                setUserEmail(result.data.email)
                // console.log(result.data.email)
                history.push('/main')
            }
            })
            .catch(() => history.push('/login'))
        }
    }, [history])

    useEffect(() => {
        handleTokenCheck();
    }, [handleTokenCheck]);

    // const handleSignOut = () => {

    // };

    return (
        <div className="page">
            <div className="page__container">
                <CurrentUserContext.Provider value={currentUser}>
                    <Header loggedIn={loggedIn} userEmail={userEmail} />
                    
                    <Switch>
                        <ProtectedRoute
                            path="/main"
                            loggedIn={loggedIn}
                            component={Main}
                            handleEditAvatarClick={handleEditAvatarClick}                 
                            handleEditProfileClick={handleEditProfileClick}        
                            handleAddPlaceClick={handleAddPlaceClick}
                            handleCardClick={handleCardClick}
                            handleLikeClick={handleCardLike}
                            handleCardDelete={handleCardDelete}
                            cards={cards}
                            // userData={data}   
                        />

                        <Route path="/signup">
                            <Register onRegister={handleRegister} />
                        </Route>

                        <Route path="/signin">
                            <Login onLogin={handleLogin} handleTokenCheck={handleTokenCheck} />
                        </Route>

                        {/* {loggedIn && <Footer />} */}

                        <Route>
                            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
                        </Route>
  
                    </Switch>

                    {loggedIn && <Footer />}

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isOpen={isBigPhotoPopupOpen}
                        onOvarlayClose={closeByOverlay}
                    />
                            
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onOvarlayClose={closeByOverlay}
                        onSubmit={handleUpdateUser}
                    />
                            
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onOvarlayClose={closeByOverlay}
                        onSubmit={handleAddPlaceSubmit}
                    />
                            
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onOvarlayClose={closeByOverlay}
                        onSubmit={handleUpdateAvatar}
                    /> 
                           
                    <PopupWithForm 
                        name="deleteСard"
                        title="Вы уверены?" 
                        children={<>
                            <button type="submit" className="popup__save popup__save_type_deleteСard">Да</button>
                        </>}
                    />
                        
                </CurrentUserContext.Provider>
            </div>
        </div>
    );
}
export default App;