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
import Swal from 'sweetalert2';
import { Flight } from '../models/flight';
import { Requestor } from '../../services/requestor';




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


  isAdmin: boolean = true;

  constructor(private firebase : HttpFlightsService, private router : Router,private requestor: Requestor) { }

    ngOnInit() {
      let flight = new Flight();
      this.requestor.sendSync([flight], 'search', 'https://flightservlet-latest.onrender.com/flightservlet').subscribe((res: any) => {

        if (res && res.result && res.result.elements) {
          console.log(res.result.elements);
          if (res.result.elements) {
            console.log("Elementi dei voli:", res.result.elements);
            this.voli = res.result.elements;
            this.voliFiltrati = this.voli;

            this.voli.sort((a, b) => {
              return a.numeroVolo.localeCompare(b.numeroVolo);
            });

          } else {
            console.error('Errore: mancanti gli elementi nella risposta', res);
          }
      } else {
          console.error('Errore: struttura della risposta non valida', res);
      }


      }, err  => {

        console.log("Errore durante la richiesta:",err);

      });



    }


    vaiAllaPagina() {
      this.router.navigate(['/dashboard/addflights']);
  }


          filtraVoli() {
            console.log('Filtro attivato con valore:', this.cercaVoli);
            if (!this.cercaVoli || this.cercaVoli.trim() === '') {
              this.voliFiltrati = this.voli.filter((volo) =>
                volo.numeroVolo && volo.destinazione && volo.status
              );
            } else {
              this.voliFiltrati = this.voli.filter((volo) =>
                (volo.destinazione && volo.destinazione.toLowerCase().includes(this.cercaVoli.toLowerCase())) ||
                (volo.numeroVolo && volo.numeroVolo.toLowerCase().includes(this.cercaVoli.toLowerCase())) ||
                (volo.compagniaAerea && volo.compagniaAerea.toLowerCase().includes(this.cercaVoli.toLowerCase()))
              );
            }


            if (this.voliFiltrati.length === 0) {
              console.log('Nessun volo trovato con i dati forniti');
            }
          }

          //funzione per andare alla pagina dei dettagli del volo
          goToFlightDetails(id: string) {
            console.log('Numero volo passato:', id);
            if (id) {
              this.router.navigate(['/dashboard/flightsDetails'], {
                queryParams: { id : id }
              });
            } else {
              console.error('Numero volo non valido:', id);
            }
          }

          //funzione per eliminare il volo dalla lista in base al NUMERO_VOLO

        delete(volo: any) {
            console.log('Volo passato al metodo delete:', volo);

            Swal.fire({
              title: 'Sei sicuro?',
              text: `Sei sicuro di voler eliminare il volo ${volo.numeroVolo}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Conferma',
              cancelButtonText: 'Annulla',
              position: 'top',
              width: 300,
            }).then((res) => {
              if (res.isConfirmed) {
                if (volo && volo.numeroVolo) {
              let flight = new Flight();
              flight.numeroVolo= volo.numeroVolo;
                  this.requestor.sendSync([flight], 'delete', 'https://flightservlet-latest.onrender.com/flightservlet').subscribe({
                    next: (data) => {
                      console.log('Volo eliminato con successo', data);


                      this.voli = this.voli.filter(item => item.numeroVolo !== volo.numeroVolo);
                      this.voliFiltrati = this.voliFiltrati.filter(item => item.numeroVolo !== volo.numeroVolo);

                      Swal.fire({
                        title: `Il volo ${flight.numeroVolo} è stato eliminato con successo!`,
                        icon: 'success',
                        position: 'top',
                        width: 300,
                      });
                    },
                    error: (error) => {
                      console.error('Errore durante l\'eliminazione del volo', error);
                      Swal.fire('Errore', 'Errore durante l\'eliminazione del volo.', 'error');
                    }
                  });
                }
              } else {
                console.log('Cancellazione annullata.');
              }
            });
}



       //funzione per modificare voli
       edit(volo: any) {
        volo.isEditing = true;
       }

       isEditing(volo:any ): boolean{
        return volo.isEditing;
       }
       save(volo: any): void {
        if (volo.id != null &&
            volo.numeroVolo != null &&
            volo.compagniaAerea != null &&
            volo.destinazione != null &&
            volo.gate != null &&
            volo.status != null) {


            let updFlight = new Flight();


            updFlight.id = volo.id;
            updFlight.numeroVolo = volo.numeroVolo;
            updFlight.compagniaAerea = volo.compagniaAerea;
            updFlight.logo = volo.logo;
            updFlight.destinazione = volo.destinazione;
            updFlight.partenza = volo.partenza;
            updFlight.checkIn = volo.checkIn;
            updFlight.gate = volo.gate;
            updFlight.status = volo.status;
            updFlight.dataVolo = volo.dataVolo;


            updFlight['class'] = 'it.swdes.test.models.Flight';

            delete volo.isEditing;

            console.log('Volo da aggiornare:', JSON.stringify(updFlight, null, 2));

            this.requestor.sendSync([updFlight], 'update', 'https://flightservlet-latest.onrender.com/flightservlet')
                .subscribe(
                    (res: any) => {
                        console.log('Risposta dal server:', res);

                        if (res !== null && res !== undefined) {
                            console.log('Volo aggiornato con successo!');

                            const index = this.voli.findIndex((f: any) => f.id === volo.id);
                            if (index !== -1) {
                              Object.assign(this.voli[index], updFlight);
                              this.voli[index].isEditing = false;
                          }

                          else {
                                console.error('Volo non trovato nell\'elenco per l\'aggiornamento');
                            }
                        } else {
                            console.error('La risposta del server è null o undefined.');
                        }
                    },
                    (error) => {

                        console.error('Errore durante la richiesta:', error);
                    }
                );
        } else {
            console.error('Dati del volo incompleti o non validi.');
        }
    }



}


