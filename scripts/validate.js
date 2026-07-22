export function showInputError(inputElement, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.name}-error`);
    errorElement.textContent = errorMessage;
}

export function hideInputError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.name}-error`);
    errorElement.textContent = "";
}

export function checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
    } else {
        hideInputError(inputElement);
    }
}

export function hasInvalidInput(inputs) {
    return Array.from(inputs).some((input) => !input.validity.valid);
}

export function toggleButtonState(inputs, button) {
    if (hasInvalidInput(inputs)) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

export function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}

export function resetValidation(formElement) {
    if (!formElement) return;

    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button");

    inputList.forEach((inputElement) => {
        hideInputError(inputElement);
    });

    toggleButtonState(inputList, buttonElement);
}