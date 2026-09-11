import { Popup } from "./Popup.js";

export type ConfirmCallback = () => void;

export class PopupWithConfirmation extends Popup {
    private confirmButton: HTMLButtonElement;
    private handleConfirm: ConfirmCallback;

    constructor(popupSelector: string, handleConfirm: ConfirmCallback) {
        super(popupSelector);
        this.confirmButton = this.popupElement.querySelector(".popup__button_type_confirm") as HTMLButtonElement;
        this.handleConfirm = handleConfirm;
    }

    setEventListeners(): void {
        super.setEventListeners();

        this.confirmButton.addEventListener("click", () => {
            this.handleConfirm();
            this.close();
        });
    }
}