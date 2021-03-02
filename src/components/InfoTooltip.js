import { useEffect } from 'react';
const escape = 27;

function InfoTooltip({ title , src, alt,  isOpen, onClose, onOvarlayClose }) {
    useEffect(
        () => {
            if(!isOpen) return;
            const handleEscClose =(event) => {
                if((event.keyCode === escape)) {
                    onClose() 
                }
            }
            document.addEventListener('keyup', handleEscClose);
            return () => {
                document.removeEventListener('keyup', handleEscClose);  
            }
        }
    )

    return (
        <div className={`popup popup_type_info-tool-tip ${isOpen && 'popup_opened'}`} onClick={onOvarlayClose}>
                <div className="popup__content popup__content_type_info-tool-tip">
                    <button className="popup__close popup__close_type_info-tool-tip" type="button" onClick={onClose}></button>
                    <img  className="popup__union" src={src} alt={alt} />
                    <h3 className="popup__title popup__title_type_info-tool-tip">{title}</h3>
                </div>
        </div>
    );
}
export default InfoTooltip;