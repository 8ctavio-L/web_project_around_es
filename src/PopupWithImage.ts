import { Popup } from "./Popup.js";

export interface PopupImageData {
    name: string;
    link: string;
}

export class PopupWithImage extends Popup {
    private popupImage: HTMLImageElement;
    private popupCaption: HTMLElement;

    constructor(popupSelector: string) {
        super(popupSelector);
        this.popupImage = document.querySelector(`${popupSelector} .popup__image`) as HTMLImageElement;
        this.popupCaption = document.querySelector(`${popupSelector} .popup__caption`) as HTMLElement;
    }

    open(data: PopupImageData): void {
        this.popupImage.src = data.link;
        this.popupImage.alt = data.name;
        this.popupCaption.textContent = data.name;
        super.open();
    }
}