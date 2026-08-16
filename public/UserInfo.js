export class UserInfo {
    nameElement;
    aboutElement;
    constructor(selectors) {
        this.nameElement = document.querySelector(selectors.nameSelector);
        this.aboutElement = document.querySelector(selectors.aboutSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            about: this.aboutElement.textContent,
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.aboutElement.textContent = data.about;
    }
}
