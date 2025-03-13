import { Injectable } from '@angular/core';
import { HttpFlightsService } from './http-flights.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAveZjeMwKEm7Njtcf6sU0jpzX7U5a-Yz0'
  signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAveZjeMwKEm7Njtcf6sU0jpzX7U5a-Yz0'
  email: string = '';
  password: string = '';
  constructor(private http : HttpFlightsService) { }


  signUp(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    console.log("Dati inviati a Firebase:", JSON.stringify(body, null, 2));

    return this.http.postUser(this.url, body);

  }

  signIn(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    console.log("Dati inviati a Firebase:", JSON.stringify(body, null, 2));

    return this.http.postUser(this.signInUrl, body);

  }



}
