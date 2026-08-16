import { Popup } from "./Popup.js";

export type FormSubmitCallback = (inputValues: { [key: string]: string }) => void;

export class PopupWithForm extends Popup {
    private formElement: HTMLFormElement;
    private handleFormSubmit: FormSubmitCallback;

    constructor(popupSelector: string, handleFormSubmit: FormSubmitCallback) {
        super(popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
        this.handleFormSubmit = handleFormSubmit;
    }
    private getInputValues(): { [key: string]: string } {
        const inputList = Array.from(
            this.formElement.querySelectorAll("input")
        ) as HTMLInputElement[];

        const values: { [key: string]: string } = {};

        inputList.forEach((input) => {
            values[input.name] = input.value;
        });

        return values;
    }

    setEventListeners(): void {
        super.setEventListeners();

        this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
            evt.preventDefault();
            const inputValues = this.getInputValues();
            this.handleFormSubmit(inputValues);
        });
    }

    close(): void {
        super.close();
        this.formElement.reset();
    }
}