const initialCards = [

    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_louise.jpg",
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald_mountains.jpg",
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
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_braies.jpg",
    }
];
initialCards.forEach(function (card) {
    console.log(card);
});


// abrir el popup de editar perfil

const profileEditButton = document.querySelector('.profile__edit-button');

const openPopupEdit = document.querySelector('#edit-popup');

const formEditProfile = openPopupEdit.querySelector('.popup__form');

const closeFormEdit = openPopupEdit.querySelector('.popup__close');

const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
}

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
}

profileEditButton.addEventListener('click', fillProfileForm);

closeFormEdit.addEventListener('click', () => closePopup(openPopupEdit));

// Campos del Formulario

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editNameInput = openPopupEdit.querySelector('.popup__input_type_name');
const editDescriptionInput = openPopupEdit.querySelector('.popup__input_type_description');


function fillProfileForm() {
    editNameInput.value = profileTitle.textContent;
    editDescriptionInput.value = profileDescription.textContent;
    openPopup(openPopupEdit);
}

function submitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = editNameInput.value;
    profileDescription.textContent = editDescriptionInput.value;
    closePopup(openPopupEdit);
}

formEditProfile.addEventListener('submit', submitProfileForm);

