import { Component } from '@angular/core';
import { HttpFlightsService } from '../../services/http-flights.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-flights',
  imports: [CommonModule,TableModule,IconFieldModule,InputIconModule,ToolbarModule,ButtonModule,InputTextModule,InputGroupModule,FormsModule],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {
  voli : any[] = [];
  cercaVoli: string = '';
  voliFiltrati: any[] = [];




  constructor(private firebase : HttpFlightsService, private router : Router) { }

  ngOnInit() {
    this.firebase.getFlights('http://localhost:8080/voli/getData').subscribe(
      (data: any) => {
        this.voli = Object.values(data);
        this.voliFiltrati = this.voli;
        console.log(this.voli);
      },
      (error) => {
        console.error('Errore nel recuperare i dati dei voli:', error);
      }
    );




  }
  filtraVoli() {
    console.log('Filtro attivato con valore:', this.cercaVoli);
    if (!this.cercaVoli || this.cercaVoli.trim() === '') {
      this.voliFiltrati = this.voli.filter((volo) =>
        volo.NUMERO_VOLO && volo.DESTINAZIONE && volo.STATUS // Solo voli con dati validi
      ); // Mostra solo i voli con dati completi
    } else {
      this.voliFiltrati = this.voli.filter((volo) =>
        (volo.DESTINAZIONE && volo.DESTINAZIONE.toLowerCase().includes(this.cercaVoli.toLowerCase())) ||
        (volo.NUMERO_VOLO && volo.NUMERO_VOLO.toLowerCase().includes(this.cercaVoli.toLowerCase())) ||
        (volo.COMPAGNIA_AEREA && volo.COMPAGNIA_AEREA.toLowerCase().includes(this.cercaVoli.toLowerCase()))
      );
    }

    // Se dopo il filtro non ci sono voli validi, puoi fare qualcosa (come un messaggio)
    if (this.voliFiltrati.length === 0) {
      console.log('Nessun volo trovato con i dati forniti');
    }
  }


goToFlightDetails(NUMERO_VOLO: string) {
  console.log('Numero volo passato:', NUMERO_VOLO);
  if (NUMERO_VOLO && NUMERO_VOLO.trim() !== '') {
    this.router.navigate(['/dashboard/flightsDetails', NUMERO_VOLO]);
  } else {
    console.error('Numero volo non valido:', NUMERO_VOLO);
  }
}

}


