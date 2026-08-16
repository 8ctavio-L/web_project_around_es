export class FormValidator {
    config;
    formElement;
    inputList;
    submitButton;
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this.submitButton = this.formElement.querySelector(this.config.submitButtonSelector);
    }
    showInputError(inputElement, errorMessage) {
        const errorElement = document.getElementById(`${inputElement.name}-error`);
        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    hideInputError(inputElement) {
        const errorElement = document.getElementById(`${inputElement.name}-error`);
        inputElement.classList.remove(this.config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass);
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this.hideInputError(inputElement);
        }
    }
    hasInvalidInput() {
        return this.inputList.some((input) => !input.validity.valid);
    }
    toggleButtonState() {
        if (this.hasInvalidInput()) {
            this.submitButton.disabled = true;
            this.submitButton.classList.add(this.config.inactiveButtonClass);
        }
        else {
            this.submitButton.disabled = false;
            this.submitButton.classList.remove(this.config.inactiveButtonClass);
        }
    }
    setEventListeners() {
        this.toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this.checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        this.inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}
