import { Component } from '@angular/core';
import { HttpFlightsService } from '../../services/http-flights.service';
import { FieldsetModule } from 'primeng/fieldset';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-latest-news',
  imports: [FieldsetModule,CommonModule],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.css'
})
export class LatestNewsComponent {
  lastNews : any[] = [];


  constructor (private firebase : HttpFlightsService) {}


  ngOnInit() {
    this.firebase.getFlights('http://localhost:8080/voli/getData').subscribe((data: any) => {
      // Filtra le notizie per assicurarti che contengano dati validi per TITOLO, DESCRIZIONE, e FONTE
      this.lastNews = Object.values(data).filter((news: any) =>
        news.TITOLO && news.DESCRIZIONE && news.FONTE // Solo notizie con tutti i dati necessari
      );
      console.log(this.lastNews); // Per verificare il risultato
    });
  }
}

