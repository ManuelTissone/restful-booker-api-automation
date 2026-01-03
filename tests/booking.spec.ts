import { test, expect } from '@playwright/test';
import { authData, bookingData, updatedBookingData } from '../fixtures/testData.ts'; 
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service.ts';

test('Create new booking order', async ({ request }) => {
    const bookingService = new BookingService(request);
    const response = await bookingService.createBooking(bookingData);
    expect(response.status()).toBe(200);
    const responseBody = await response.json()//PASAMOS EL JSON A JS
    expect(responseBody.bookingid).toBeGreaterThan(0); //Valida que sea num y >0
    expect(responseBody.booking.firstname).toBe(bookingData.firstname);
    expect(responseBody.booking.lastname).toBe(bookingData.lastname);
    expect(responseBody.booking.totalprice).toBe(bookingData.totalprice);
})
test('Get booking by ID', async ({ request }) => {
    const bookingService = new BookingService(request);
    const postResponse = await bookingService.createBooking(bookingData);
    const responseBody = await postResponse.json();
    const bookingid = responseBody.bookingid;
    const getResponse = await bookingService.getBooking(bookingid);
    expect(getResponse.status()).toBe(200);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.firstname).toBe(bookingData.firstname);
    expect(getResponseBody.lastname).toBe(bookingData.lastname);
    expect(getResponseBody.totalprice).toBe(bookingData.totalprice);
})
test('Delete booking by ID', async ({ request }) => {
    const authService = new AuthService(request);
    const authResponse = await authService.getToken(authData);
    const authBody = await authResponse.json(); //Parsear JSON
    const token = authBody.token; //Guardar "token": "abc123... "
    const bookingService = new BookingService(request);
    const postResponse = await bookingService.createBooking(bookingData);
    const responseBody = await postResponse.json();
    const bookingid = responseBody.bookingid;
    const deleteResponse = await bookingService.deleteBooking(bookingid, token);
    expect(deleteResponse.status()).toBe(201);//Documentacion dice 200 pero en realidad 201 Created
    const getResponse = await bookingService.getBooking(bookingid);
    expect(getResponse.status()).toBe(404);//DEVUELVE ERROR
})
test('Update booking by ID', async ({ request }) => {
    const authService = new AuthService(request);
    const authResponse = await authService.getToken(authData);
    const authBody = await authResponse.json(); //Parsear JSON
    const token = authBody.token;
    const bookingService = new BookingService(request);
    const postResponse = await bookingService.createBooking(bookingData);
    const responseBody = await postResponse.json();
    const bookingid = responseBody.bookingid;
    const putResponse = await bookingService.updateBooking(bookingid,updatedBookingData,token);
    expect(putResponse.status()).toBe(200);
    const getResponse = await bookingService.getBooking(bookingid);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.firstname).toBe(updatedBookingData.firstname);
    expect(getResponseBody.lastname).toBe(updatedBookingData.lastname);
    expect(getResponseBody.totalprice).toBe(updatedBookingData.totalprice);
})
;


