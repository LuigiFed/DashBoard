import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';  // Correzione per il modulo Button
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpFlightsService } from '../../services/http-flights.service';
import { Flight } from '../models/flight';
import { Requestor } from '../../services/requestor';


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

  constructor(private route: ActivatedRoute, private firebase: HttpFlightsService,private requestor: Requestor) {}

  ngOnInit(): void {
  //   this.firebase.getFlights('http://localhost:8080/flightservlet').subscribe((data: any) => {
  //     this.dettagliVolo = data;
  //     this.voli = Object.values(data);  // Converto i dati in un array di voli

  //     // Ottieni il numero del volo dalla route
  //     this.numeroVolo = this.route.snapshot.paramMap.get('numeroVolo') || '';
  //     console.log('Numero volo dalla route:', this.numeroVolo);

  //     this.voloSelezionato = this.voli.find(volo => String(volo.NUMERO_VOLO) === String(this.numeroVolo));


  //   });
  // }


  this.route.queryParams.subscribe(params => {
    this.numeroVolo = params['numeroVolo'] || '';
    console.log('Numero volo dai query params:', this.numeroVolo);


    let flight = new Flight();
    this.requestor.sendSync([flight], 'search', 'https://flightservlet-latest.onrender.com/flightservlet/')
      .subscribe((res: any) => {
        this.dettagliVolo = res.result.elements;
        this.voli = Object.values(res.result.elements);
        this.voloSelezionato = this.voli.find(volo =>
          String(volo.numeroVolo) === String(this.numeroVolo)
        );
      }, err => {
        console.log("Errore durante la richiesta:", err);
      });
  });
  }


    // whatsAppLink(phoneNumber: string, flightNumber: string) {
  //   phoneNumber = "+1 (555) 049-0217";
  //   const today = new Date();
  //   const flightDate = today.toISOString().split('T')[0];


  //   const apiUrl = 'http://localhost:8080/flightservlet/webhook';

  //   this.http.post(apiUrl, {
  //     phoneNumber: phoneNumber,
  //     flightNumber: flightNumber,
  //     flightDate: flightDate
  //   }).subscribe(
  //     response => {
  //       console.log('Sottoscrizione registrata con successo');

  //       const message = `ISCRIZIONE NOTIFICHE: Vorrei ricevere aggiornamenti sul volo ${flightNumber} del ${flightDate}. #subscribe`;
  //       const encodedMessage = encodeURIComponent(message);
  //       const urlUpdate = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
  //       window.open(urlUpdate, '_blank');
  //     },
  //     error => {
  //       console.error('Errore nella registrazione della sottoscrizione', error);
  //     }
  //   );
  // }

  whatsAppLink(phoneNumber: string, flightNumber: string) {
    phoneNumber = "+1 (555) 049-0217"
    const Today = this.voloSelezionato.dataVolo;
    const flightDate = Today.toISOString().split('T')[0];


    const message = `ISCRIZIONE NOTIFICHE: Vorrei ricevere aggiornamenti sul volo ${flightNumber} del ${flightDate}. #subscribe`;
    const encodedMessage = encodeURIComponent(message);


    const urlUpdate = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;


    window.open(urlUpdate, '_blank');
  }


}
