export class Section {
    items;
    renderer;
    containerSelector;
    constructor(data, containerSelector) {
        this.items = data.items;
        this.renderer = data.renderer;
        this.containerSelector = containerSelector;
    }
    renderItems() {
        this.items.forEach((item) => {
            this.renderer(item);
        });
    }
    addItem(element) {
        const container = document.querySelector(this.containerSelector);
        container?.append(element);
    }
}
