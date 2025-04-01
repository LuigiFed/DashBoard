import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';  // Correzione per il modulo Button
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpFlightsService } from '../../services/http-flights.service';
import { Flight } from '../models/flight';
import { Requestor } from '../../services/requestor';
import { PushNotificationsService } from '../../services/push-notifications.service';
import Swal from 'sweetalert2';
import { initializeApp } from '@angular/fire/app';
import { getMessaging, onMessage } from '@angular/fire/messaging';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-flights-details',
  imports: [CardModule, ButtonModule, FormsModule, CommonModule],
  templateUrl: './flights-details.component.html',
  styleUrls: ['./flights-details.component.css']
})
export class FlightsDetailsComponent implements OnInit {

  numeroVolo: string = '';
  voli: any[] = [];
  voloSelezionato: any = null;
  dettagliVolo: any;
  id: number = 0;
  private messaging: any;


  constructor(private route: ActivatedRoute, private firebase: HttpFlightsService,private requestor: Requestor,private pushService: PushNotificationsService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || '';
      console.log('Numero volo dai query params:', this.id);

      let flight = new Flight();
      flight.id = this.id;
      this.requestor.sendSync([flight], 'search', 'https://flightservlet-latest.onrender.com/flightservlet/')
        .subscribe((res: any) => {
          this.dettagliVolo = res.result.elements;
          this.voli = Object.values(res.result.elements);
          this.voloSelezionato = this.voli.find(volo =>
            String(volo.id) === String(this.id)
          );
        }, err => {
          console.log("Errore durante la richiesta:", err);
        });
    });


    const app = initializeApp(environment.firebaseConfig);

    this.messaging = getMessaging(app);

    this.pushService.requestPermission(new Flight());


  }
  whatsAppLink(phoneNumber: string, flightNumber: string) {
    phoneNumber = "+1 (555) 049-0217"
    const Today = new Date(this.voloSelezionato.dataVolo);
    const flightDate = Today.toISOString().split('T')[0];


    const message = `ISCRIZIONE NOTIFICHE: Vorrei ricevere aggiornamenti sul volo ${flightNumber} del ${flightDate}. #subscribe`;
    const encodedMessage = encodeURIComponent(message);


    const urlUpdate = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;


    window.open(urlUpdate, '_blank');
  }

  telegramLink(username: string, flightNumber: string) {
    username = 'ServletFlightsBot';
    const Today = new Date(this.voloSelezionato.dataVolo);
    const flightDate = Today.toISOString().split('T')[0];

    const message = `ISCRIZIONE NOTIFICHE: Vorrei ricevere aggiornamenti sul volo ${flightNumber} del ${flightDate}. #subscribe`;
    const encodedMessage = encodeURIComponent(message);

    const urlUpdate = `https://t.me/${username}?text=${encodedMessage}`;

    window.open(urlUpdate, '_blank');
  }

  enablePushNotifications(flight: Flight): void {
    Swal.fire({
      text: `Voglio seguire il volo ${flight.numeroVolo} del ${flight.dataVolo}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Conferma',
      cancelButtonText: 'Annulla',
      showLoaderOnConfirm: true,
      position: 'top',
      width: 300,
      preConfirm: () => {
        return this.pushService.setupServiceWorker(flight)
          .then(token => {
            if (!token) {
              throw new Error("Token non disponibile");
            }
            return token;
          })
          .catch(err => {
            Swal.fire({
              title: 'Errore!',
              text: 'Impossibile ottenere il token Firebase.',
              icon: 'error',
              position: 'top',
              width: 300,
            });
            throw err;
          });
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const token = result.value;
        console.log('Token ricevuto:', token);
        this.pushService.sendSubscriptionToBackend(flight, token);
        Swal.fire({
          title: `Sottoscrizione al servizio di aggiornamento del volo ${flight.numeroVolo}!`,
          icon: 'success',
          position: 'top',
          width: 300,
        });
      }
    });
  }

}



