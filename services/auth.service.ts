import { APIRequestContext } from "@playwright/test";

export class AuthService { 
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async getToken(authData: object){
        const response = await this.request.post('/auth', {
            data: authData
        });
        return response;       
    }
    
}
