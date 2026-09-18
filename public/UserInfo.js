export class UserInfo {
    nameElement;
    aboutElement;
    avatarElement;
    constructor(selectors) {
        this.nameElement = document.querySelector(selectors.nameSelector);
        this.aboutElement = document.querySelector(selectors.aboutSelector);
        this.avatarElement = document.querySelector(selectors.avatarSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            about: this.aboutElement.textContent,
            avatar: this.avatarElement.src,
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.aboutElement.textContent = data.about;
        this.avatarElement.src = data.avatar;
    }
}
