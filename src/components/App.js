import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { useState, useEffect } from 'react';
import api from "../utils/api";
import { CurrentUserContext }  from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isBigPhotoPopupOpen, setIsBigPhotoPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    // const loggedIn = false;

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

    return (
        <div className="page">
            <div className="page__container">
                <CurrentUserContext.Provider value={currentUser}>
                    <Header />

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
                                
                        />

                        <Route path="/sign-up">
                            <Register />
                        </Route>

                        <Route path="/sign-in">
                            <Login />
                        </Route>

                        {loggedIn && <Footer />}

                        <Route>
                            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
                        </Route>
  
                    </Switch>

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



{/* <ProtectedRoute path="/ducks" loggedIn={loggedIn} onSignOut={handleSignOut} component={Ducks} /> */}
                            {/* <Route path="/main">
                                <Header />
                                <Main
                                    handleEditAvatarClick={handleEditAvatarClick}                 
                                    handleEditProfileClick={handleEditProfileClick}        
                                    handleAddPlaceClick={handleAddPlaceClick}
                                    handleCardClick={handleCardClick}
                                    handleLikeClick={handleCardLike}
                                    handleCardDelete={handleCardDelete}
                                    cards={cards}
                                />
                                <Footer />
                            </Route> */}
                            {/* <Route>
                                <ImagePopup
                                    card={selectedCard}
                                    onClose={closeAllPopups}
                                    isOpen={isBigPhotoPopupOpen}
                                    onOvarlayClose={closeByOverlay}
                                />
                            </Route>
                            <Route>
                                <EditProfilePopup
                                    isOpen={isEditProfilePopupOpen}
                                    onClose={closeAllPopups}
                                    onOvarlayClose={closeByOverlay}
                                    onSubmit={handleUpdateUser}
                                />
                            </Route>
                            <Route>
                                <AddPlacePopup
                                    isOpen={isAddPlacePopupOpen}
                                    onClose={closeAllPopups}
                                    onOvarlayClose={closeByOverlay}
                                    onSubmit={handleAddPlaceSubmit}
                                />
                            </Route>
                            <Route>
                                <EditAvatarPopup
                                    isOpen={isEditAvatarPopupOpen}
                                    onClose={closeAllPopups}
                                    onOvarlayClose={closeByOverlay}
                                    onSubmit={handleUpdateAvatar}
                                /> 
                            </Route>
                            <Route>
                                <PopupWithForm 
                                    name="deleteСard"
                                    title="Вы уверены?" 
                                    children={<>
                                        <button type="submit" className="popup__save popup__save_type_deleteСard">Да</button>
                                    </>}
                                />
                            </Route> */}