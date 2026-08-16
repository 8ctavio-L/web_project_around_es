export class Card {
    data;
    cardSelector;
    handleCardClick;
    element;
    constructor(data, cardSelector, handleCardClick) {
        this.data = data;
        this.cardSelector = cardSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.cardSelector);
        const cardElement = cardTemplate.content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this.element = this.getTemplate();
        const cardImage = this.element.querySelector(".card__image");
        const cardTitle = this.element.querySelector(".card__title");
        cardImage.src = this.data.link;
        cardImage.alt = this.data.name;
        cardTitle.textContent = this.data.name;
        this.setEventListeners();
        return this.element;
    }
    setEventListeners() {
        const cardLikeButton = this.element.querySelector(".card__like-button");
        const cardDelete = this.element.querySelector(".card__delete-button");
        const cardImage = this.element.querySelector(".card__image");
        cardLikeButton.addEventListener("click", () => {
            cardLikeButton.classList.toggle("card__like-button_is-active");
        });
        cardDelete.addEventListener("click", () => {
            this.element.remove();
        });
        cardImage.addEventListener("click", () => {
            this.handleCardClick();
        });
    }
}
