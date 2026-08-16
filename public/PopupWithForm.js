import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    handleFormSubmit;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        const inputList = Array.from(this.formElement.querySelectorAll("input"));
        const values = {};
        inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this.getInputValues();
            this.handleFormSubmit(inputValues);
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
