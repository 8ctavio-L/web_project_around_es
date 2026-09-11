import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    confirmButton;
    handleConfirm;
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this.confirmButton = this.popupElement.querySelector(".popup__button_type_confirm");
        this.handleConfirm = handleConfirm;
    }
    setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener("click", () => {
            this.handleConfirm();
            this.close();
        });
    }
}
