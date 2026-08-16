
export interface CardData {
    name: string;
    link: string;
}

export class Card {
    private data: CardData;
    private cardSelector: string;
    private handleCardClick: () => void;
    private element!: HTMLElement;


    constructor(
        data: CardData,
        cardSelector: string,
        handleCardClick: () => void,
    ) {
        this.data = data;
        this.cardSelector = cardSelector
        this.handleCardClick = handleCardClick
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
        return this.element;

    }

    private setEventListeners(): void {
        const cardLikeButton = this.element.querySelector(".card__like-button") as HTMLButtonElement;
        const cardDelete = this.element.querySelector(".card__delete-button") as HTMLElement;
        const cardImage = this.element.querySelector(".card__image") as HTMLImageElement;
        cardLikeButton.addEventListener("click", () => {
            cardLikeButton.classList.toggle("card__like-button_is-active");
        })
        cardDelete.addEventListener("click", () => {
            this.element.remove();
        })
        cardImage.addEventListener("click", () => {
            this.handleCardClick();
        })

    }

}
