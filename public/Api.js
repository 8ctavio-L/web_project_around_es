export class Api {
    baseUrl;
    headers;
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    async getUserInfo() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async getInitialCards() {
        const res = await fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async editProfile(data) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            method: "PATCH",
            body: JSON.stringify(data)
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async addCard(data) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify(data)
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async likeCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            headers: this.headers,
            method: "PUT",
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async unlikeCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            headers: this.headers,
            method: "DELETE",
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async deleteCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            headers: this.headers,
            method: "DELETE",
        });
        if (res.ok) {
            return;
        }
        throw new Error(`Error: ${res.status}`);
    }
    async updateAvatar(avatarURL) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
            headers: this.headers,
            method: "PATCH",
            body: JSON.stringify({ avatar: avatarURL })
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
}
