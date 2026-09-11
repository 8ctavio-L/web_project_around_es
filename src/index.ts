import { Card } from "./Card.js";
import { CardData } from "./Api.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Api } from "./Api.js";
import { apiConfig } from "./utils/api-config.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";

const api = new Api(apiConfig);

// validación forms
const editProfileForm = document.querySelector("#edit-profile-form") as HTMLFormElement;
const newCardFormEl = document.querySelector("#new-card-form") as HTMLFormElement;

const editProfileValidator = new FormValidator(defaultFormConfig, editProfileForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardFormEl);

editProfileValidator.enableValidation();
newCardValidator.enableValidation();

// Popup de imagen
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup", async () => {
    if (!cardToDelete) return;

    try {
        await api.deleteCard(cardToDelete.cardId);
        cardToDelete.card.removeCard();
    } catch (err) {
        console.error("Error al eliminar la tarjeta:", err);
    }
});
deleteCardPopup.setEventListeners();

function handleCardClick(data: CardData): void {
    popupWithImage.open(data);
}

let cardToDelete: { cardId: string; card: Card } | null = null;

// Sección de tarjetas (arranca vacía, se llena con datos reales del servidor)
const cardSection = new Section<CardData>(
    {
        items: [],
        renderer: (item) => {
            const card = new Card(item, "#card-template", () => handleCardClick(item), handleLikeClick, handleDeleteClick)
            cardSection.addItem(card.generateCard());
        },
    },
    ".cards__list"
);

// Información del usuario
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
});

// Cargar datos reales del servidor: usuario + tarjetas, en paralelo
async function renderInitialData(): Promise<void> {
    try {
        const [userData, initialCards] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ]);

        userInfo.setUserInfo({ name: userData.name, about: userData.about });

        initialCards.forEach((cardData) => {
            const card = new Card(cardData, "#card-template", () => handleCardClick(cardData), handleLikeClick, handleDeleteClick)
            cardSection.addItem(card.generateCard());
        });
    } catch (err) {
        console.error("Fallo al cargar datos iniciales:", err);
    }
}

renderInitialData();

// Popup: editar perfil sp9
const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
    try {
        const updatedUser = await api.editProfile({
            name: inputValues["name"],
            about: inputValues["description"],
        });
        userInfo.setUserInfo({ name: updatedUser.name, about: updatedUser.about });
        editProfilePopup.close();
    } catch (err) {
        console.error("Error al actualizar el perfil:", err);
    }
});

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

// Popup: nueva tarjeta - sp9
const newCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
    try {
        const newCardData = await api.addCard({
            name: inputValues["place-name"],
            link: inputValues["link"],
        });
        const card = new Card(newCardData, "#card-template", () => handleCardClick(newCardData), handleLikeClick, handleDeleteClick)
        cardSection.addItem(card.generateCard());
        newCardPopup.close();

    } catch (err) {
        console.error("Error al agregar la tarjeta:", err);
    }
});

newCardPopup.setEventListeners();

const profileAddButton = document.querySelector(".profile__add-button") as HTMLElement;
profileAddButton.addEventListener("click", () => {
    newCardValidator.resetValidation();
    newCardPopup.open();
});

async function handleLikeClick(cardId: string, isLiked: boolean, card: Card): Promise<void> {
    try {
        const updatedCard = isLiked
            ? await api.unlikeCard(cardId)
            : await api.likeCard(cardId);

        card.updateLikeButton(updatedCard.isLiked);
    } catch (err) {
        console.error("Error al actualizar el like:", err);
    }

}
function handleDeleteClick(cardId: string, card: Card): void {
    cardToDelete = { cardId, card };
    deleteCardPopup.open();
}


