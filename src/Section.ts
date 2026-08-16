export class Section<T> {
    private items: T[];
    private renderer: (item: T) => void;
    private containerSelector: string;

    constructor(
        data: { items: T[]; renderer: (item: T) => void },
        containerSelector: string
    ) {
        this.items = data.items;
        this.renderer = data.renderer;
        this.containerSelector = containerSelector;
    }

    public renderItems(): void {
        this.items.forEach((item) => {
            this.renderer(item);
        })
    }

    public addItem(element: HTMLElement): void {
        const container = document.querySelector(this.containerSelector)
        container?.append(element)
    }


}
