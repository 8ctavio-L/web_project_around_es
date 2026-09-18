import { CardData } from "./Api.js";


export interface CardFormData {
    name: string;
    link: string;
}

export class Card {
    private data: CardData;
    private cardSelector: string;
    private handleCardClick: () => void;
    private handleLikeClick: (cardId: string, isLiked: boolean, card: Card) => void;
    private handleDeleteClick: (cardId: string, card: Card) => void;
    private element!: HTMLElement;
    private likeButton!: HTMLButtonElement;
    private cardDelete!: HTMLElement;


    constructor(
        data: CardData,
        cardSelector: string,
        handleCardClick: () => void,
        handleLikeClick: (cardId: string, isLiked: boolean, card: Card) => void,
        handleDeleteClick: (cardId: string, card: Card) => void,
    ) {
        this.data = data;
        this.cardSelector = cardSelector
        this.handleCardClick = handleCardClick
        this.handleLikeClick = handleLikeClick
        this.handleDeleteClick = handleDeleteClick;

    }

    private getTemplate(): HTMLElement {
        const cardTemplate = document.querySelector(this.cardSelector) as HTMLTemplateElement;
        const cardElement = cardTemplate.content.querySelector(".card")!
            .cloneNode(true) as HTMLElement;
        return cardElement;

    }
    public generateCard(): HTMLElement {
        this.element = this.getTemplate();
        const cardImage = this.element.querySelector(".card__image") as HTMLImageElement;
        const cardTitle = this.element.querySelector(".card__title") as HTMLElement;
        cardImage.src = this.data.link;
        cardImage.alt = this.data.name;
        cardTitle.textContent = this.data.name;
        this.setEventListeners();
        this.updateLikeButton(this.data.isLiked);
        return this.element;

    }

    public updateLikeButton(isLiked: boolean): void {
        this.data.isLiked = isLiked;
        if (isLiked) {
            this.likeButton.classList.add("card__like-button_is-active");
        } else {
            this.likeButton.classList.remove("card__like-button_is-active");
        }
    }

    public removeCard(): void {
        this.element.remove();
    }

    private setEventListeners(): void {
        this.likeButton = this.element.querySelector(".card__like-button") as HTMLButtonElement;
        this.cardDelete = this.element.querySelector(".card__delete-button") as HTMLElement;
        const cardImage = this.element.querySelector(".card__image") as HTMLImageElement;

        this.likeButton.addEventListener("click", () => {
            this.handleLikeClick(this.data._id, this.data.isLiked, this);
        });
        this.cardDelete.addEventListener("click", () => {
            this.handleDeleteClick(this.data._id, this)
        });
        cardImage.addEventListener("click", () => {
            this.handleCardClick();
        });
    }

}
