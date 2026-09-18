
export interface UserData {
    name: string;
    about: string;
    avatar: string;
}

export class UserInfo {
    private nameElement: HTMLElement;
    private aboutElement: HTMLElement;
    private avatarElement: HTMLImageElement;

    constructor(selectors: { nameSelector: string; aboutSelector: string; avatarSelector: string; }) {
        this.nameElement = document.querySelector(selectors.nameSelector) as HTMLElement;
        this.aboutElement = document.querySelector(selectors.aboutSelector) as HTMLElement;
        this.avatarElement = document.querySelector(selectors.avatarSelector) as HTMLImageElement
    }

    public getUserInfo(): UserData {
        return {
            name: this.nameElement.textContent,
            about: this.aboutElement.textContent,
            avatar: this.avatarElement.src,
        };
    }

    public setUserInfo(data: UserData): void {
        this.nameElement.textContent = data.name;
        this.aboutElement.textContent = data.about;
        this.avatarElement.src = data.avatar;


    }




}