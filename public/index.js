import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
// --- cards ---
const initialCards = [
    { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
    { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
    { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" },
];
//  validacion forms 
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardFormEl = document.querySelector("#new-card-form");
const editProfileValidator = new FormValidator(defaultFormConfig, editProfileForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardFormEl);
editProfileValidator.enableValidation();
newCardValidator.enableValidation();
// Popup de imagen 
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();
function handleCardClick(data) {
    popupWithImage.open(data);
}
// Sección de tarjetas
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "#card-template", () => handleCardClick(item));
        cardSection.addItem(card.generateCard());
    },
}, ".cards__list");
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
const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    const nameInput = editProfileForm.querySelector('input[name="name"]');
    const descriptionInput = editProfileForm.querySelector('input[name="description"]');
    nameInput.value = currentUserInfo.name;
    descriptionInput.value = currentUserInfo.about;
    editProfileValidator.resetValidation();
    editProfilePopup.open();
});
//  Popup
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    const newCardData = {
        name: inputValues["place-name"],
        link: inputValues["link"],
    };
    const card = new Card(newCardData, "#card-template", () => handleCardClick(newCardData));
    cardSection.addItem(card.generateCard());
    newCardPopup.close();
});
newCardPopup.setEventListeners();
const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => {
    newCardValidator.resetValidation();
    newCardPopup.open();
});
