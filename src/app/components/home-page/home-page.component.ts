import { Component, AfterViewInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TravelSuggestionsService } from '../../services/travel-suggestions.service';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home-page',
  imports: [StyleClassModule, ButtonModule, ChartModule,FormsModule,CommonModule,CardModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  flightData: any;
  chartOptions: any;
 travelSuggestions: any[] = [];


  constructor(private travel : TravelSuggestionsService) {
    // Dati del grafico
    this.flightData = {
      labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
      datasets: [
        {
          label: 'Flights per Time of Day',
          backgroundColor: '#007bff',
          borderColor: '#0056b3',
          data: [320, 540, 700, 480]
        }
      ]
    };

    // Opzioni del grafico
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }

  ngOnInit(): void {
    this.travel.getTravelSuggestions().subscribe(
      (data) => {
        console.log("Dati ricevuti:", data);
        this.travelSuggestions = data;
      },
      (error) => {
        console.error("Errore durante il recupero dei suggerimenti:", error);
      }
    );
  }



  }




