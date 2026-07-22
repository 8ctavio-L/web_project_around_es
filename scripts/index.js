
import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, resetValidation } from "./validate.js";

const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
];

initialCards.forEach((place) => {
    console.log(place.name);
});

const editButton = document.querySelector(".profile__edit-button");
const editForm = document.querySelector("#edit-popup");
const closeButtom = editForm.querySelector(".popup__close");
const nameForm = editForm.querySelector(".popup__input_type_name");
const descriptionForm = editForm.querySelector(
    ".popup__input_type_description",
);
const profile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");
//Adding card buttons.
const cardForm = document.querySelector("#new-card-popup");
const closeAddCard = cardForm.querySelector(".popup__close");
const addCard = document.querySelector(".profile__add-button");


//form inputs
const addNameInput = cardForm.querySelector(".popup__input_type_card-name");
const addUrlInput = cardForm.querySelector(".popup__input_type_url");

addCard.addEventListener("click", function () {
    openModal(cardForm);
});
closeAddCard.addEventListener("click", function () {
    closeModal(cardForm);
    resetValidation(newCardForm);
});
const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");

const cardList = document.querySelector(".cards__list");

editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profile.textContent = nameForm.value;
    descriptionProfile.textContent = descriptionForm.value;
    closeModal(editForm);
});

function openModal(modal) {
    modal.classList.add("popup_is-opened");
}

function closeModal(modal, formElement) {
    modal.classList.remove("popup_is-opened");
    resetValidation(formElement);
}

editButton.addEventListener("click", function () {
    openModal(editForm);
});
closeButtom.addEventListener("click", function () {
    closeModal(editForm, editProfileForm);
    resetValidation(editProfileForm);
});



//open img
const imgPopup = document.querySelector("#image-popup");
const popupImg = imgPopup.querySelector(".popup__image");
const captionPopup = imgPopup.querySelector(".popup__caption");


// close img

const closePopup = imgPopup.querySelector(".popup__close");

function getCardElement(name = "No title", img = "") {
    const cardElement = cardTemplate.cloneNode(true);

    const nameElement = cardElement.querySelector(".card__title");
    nameElement.textContent = name;
    const imgElement = cardElement.querySelector(".card__image");
    imgElement.src = img;

    //like button
    const cardLike = cardElement.querySelector(".card__like-button");
    cardLike.addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__like-button_is-active");
    });

    // trash button
    const cardTrash = cardElement.querySelector(".card__delete-button");
    cardTrash.addEventListener("click", function (evt) {
        cardElement.remove();
    });

    imgElement.addEventListener("click", function (evt) {
        popupImg.src = img;
        captionPopup.textContent = name;
        openModal(imgPopup);
    });
    closePopup.addEventListener("click", function (evt) {
        closeModal(imgPopup);
    });
    return cardElement;
}
function renderCard(name, link, container) {
    const cardElement = getCardElement(name, link);

    container.prepend(cardElement);
}

initialCards.forEach((card) => {
    renderCard(card.name, card.link, cardList);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    renderCard(addNameInput.value, addUrlInput.value, cardList);
    closeModal(cardForm);
    addNameInput.value = "";
    addUrlInput.value = "";
}

cardForm.addEventListener("submit", handleCardFormSubmit);

const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

setEventListeners(editProfileForm);
setEventListeners(newCardForm);

function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
}
function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

document.addEventListener("keydown", closeByEscape);
editForm.addEventListener("click", closeByOverlay);
cardForm.addEventListener("click", closeByOverlay);
imgPopup.addEventListener("click", closeByOverlay);
