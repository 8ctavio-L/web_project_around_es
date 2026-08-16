import { CardData, Card } from "./Card.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

// --- cards ---
const initialCards: CardData[] = [
    { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
    { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
    { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" },
];

//  validacion forms 
const editProfileForm = document.querySelector("#edit-profile-form") as HTMLFormElement;
const newCardFormEl = document.querySelector("#new-card-form") as HTMLFormElement;

const editProfileValidator = new FormValidator(defaultFormConfig, editProfileForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardFormEl);

editProfileValidator.enableValidation();
newCardValidator.enableValidation();

// Popup de imagen 
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

function handleCardClick(data: CardData): void {
    popupWithImage.open(data);
}

// Sección de tarjetas
const cardSection = new Section<CardData>(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, "#card-template", () => handleCardClick(item));
            cardSection.addItem(card.generateCard());
        },
    },
    ".cards__list"
);

cardSection.renderItems();

// Información del usuario 
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
});

// Popup: editar perfil 
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
    userInfo.setUserInfo({
        name: inputValues["name"],
        about: inputValues["description"],
    });
    editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const profileEditButton = document.querySelector(".profile__edit-button") as HTMLElement;
profileEditButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    const nameInput = editProfileForm.querySelector('input[name="name"]') as HTMLInputElement;
    const descriptionInput = editProfileForm.querySelector('input[name="description"]') as HTMLInputElement;
    nameInput.value = currentUserInfo.name;
    descriptionInput.value = currentUserInfo.about;
    editProfileValidator.resetValidation();
    editProfilePopup.open();
});

//  Popup
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    const newCardData: CardData = {
        name: inputValues["place-name"],
        link: inputValues["link"],
    };
    const card = new Card(newCardData, "#card-template", () => handleCardClick(newCardData));
    cardSection.addItem(card.generateCard());
    newCardPopup.close();
});
newCardPopup.setEventListeners();

const profileAddButton = document.querySelector(".profile__add-button") as HTMLElement;
profileAddButton.addEventListener("click", () => {
    newCardValidator.resetValidation();
    newCardPopup.open();
});