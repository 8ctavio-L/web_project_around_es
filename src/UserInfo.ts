
export interface UserData {
    name: string;
    about: string;
}

export class UserInfo {
    private nameElement: HTMLElement;
    private aboutElement: HTMLElement;

    constructor(selectors: { nameSelector: string; aboutSelector: string }) {
        this.nameElement = document.querySelector(selectors.nameSelector) as HTMLElement;
        this.aboutElement = document.querySelector(selectors.aboutSelector) as HTMLElement;
    }

    public getUserInfo(): UserData {
        return {
            name: this.nameElement.textContent,
            about: this.aboutElement.textContent,
        };
    }

    public setUserInfo(data: UserData): void {
        this.nameElement.textContent = data.name;
        this.aboutElement.textContent = data.about;


    }




}