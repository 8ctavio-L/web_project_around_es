

export interface FormConfig {
    inputSelector: string;
    submitButtonSelector: string;
    inactiveButtonClass: string;
    inputErrorClass: string;
    errorClass: string;
}

export const defaultFormConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
}