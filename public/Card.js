export class Card {
    data;
    cardSelector;
    handleCardClick;
    handleLikeClick;
    handleDeleteClick;
    element;
    likeButton;
    cardDelete;
    constructor(data, cardSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
        this.data = data;
        this.cardSelector = cardSelector;
        this.handleCardClick = handleCardClick;
        this.handleLikeClick = handleLikeClick;
        this.handleDeleteClick = handleDeleteClick;
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
        this.updateLikeButton(this.data.isLiked);
        return this.element;
    }
    updateLikeButton(isLiked) {
        this.data.isLiked = isLiked;
        if (isLiked) {
            this.likeButton.classList.add("card__like-button_is-active");
        }
        else {
            this.likeButton.classList.remove("card__like-button_is-active");
        }
    }
    removeCard() {
        this.element.remove();
    }
    setEventListeners() {
        this.likeButton = this.element.querySelector(".card__like-button");
        this.cardDelete = this.element.querySelector(".card__delete-button");
        const cardImage = this.element.querySelector(".card__image");
        this.likeButton.addEventListener("click", () => {
            this.handleLikeClick(this.data._id, this.data.isLiked, this);
        });
        this.cardDelete.addEventListener("click", () => {
            this.handleDeleteClick(this.data._id, this);
        });
        cardImage.addEventListener("click", () => {
            this.handleCardClick();
        });
    }
}
