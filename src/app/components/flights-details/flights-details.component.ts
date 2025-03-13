import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';  // Correzione per il modulo Button
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpFlightsService } from '../../services/http-flights.service';

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

  constructor(private route: ActivatedRoute, private firebase: HttpFlightsService) {}

  ngOnInit(): void {
    this.firebase.getFlights('http://localhost:8080/voli/getData').subscribe((data: any) => {
      this.dettagliVolo = data;
      this.voli = Object.values(data);  // Converto i dati in un array di voli

      // Ottieni il numero del volo dalla route
      this.numeroVolo = this.route.snapshot.paramMap.get('numeroVolo') || '';
      console.log('Numero volo dalla route:', this.numeroVolo);

      this.voloSelezionato = this.voli.find(volo => String(volo.NUMERO_VOLO) === String(this.numeroVolo));


    });
  }
  }

