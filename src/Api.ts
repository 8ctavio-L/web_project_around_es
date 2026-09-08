export interface ApiOptions{
    baseUrl: string;
    headers: {
        authorization: string;
        "Content-Type": string;
    };
}

export class Api {
    private baseUrl: string;
    private headers: { authorization: string; "Content-Type": string };

    constructor (options: ApiOptions){
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }


    async getUserInfo(): Promise<UserData>{
    const res = await fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
    });
    if (res.ok) {
        return await res.json();
    }

    throw new Error(`Error: ${res.status}`);
}
}





