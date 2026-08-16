import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    popupImage;
    popupCaption;
    constructor(popupSelector) {
        super(popupSelector);
        this.popupImage = document.querySelector(`${popupSelector} .popup__image`);
        this.popupCaption = document.querySelector(`${popupSelector} .popup__caption`);
    }
    open(data) {
        this.popupImage.src = data.link;
        this.popupImage.alt = data.name;
        this.popupCaption.textContent = data.name;
        super.open();
    }
}
