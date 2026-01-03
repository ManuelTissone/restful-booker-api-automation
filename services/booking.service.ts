import { APIRequestContext } from "@playwright/test";

export class BookingService { 
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async createBooking(bookingData: object) {
        const response = await this.request.post('/booking', {
           data: bookingData
        });
        return response;
    }
    async getBooking(bookingid: number) {
        const response = await this.request.get(`/booking/${bookingid}`);
        return response;
    }
    async deleteBooking(bookingid: number, token: string){
        const response = await this.request.delete(`/booking/${bookingid}`, {
            headers: { 
                'Cookie': `token=${token}`
            }
        });
        return response;
    }
    async updateBooking(bookingid: number, updatedBookingData: object, token: string){
        const response = await this.request.put(`/booking/${bookingid}`, {
            headers: { 
                'Cookie': `token=${token}`
            },
            data: updatedBookingData
        });
        return response;
    }
    
}