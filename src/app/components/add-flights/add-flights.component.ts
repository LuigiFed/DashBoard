import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpFlightsService } from '../../services/http-flights.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flights',
  imports: [FormsModule],
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css'] // Assicurati che il nome sia corretto (styleUrls non styleUrl)
})
export class AddFlightsComponent {
  voli: any[] = [];
  isSubmitting: boolean = false; // Flag per evitare invii multipli


  constructor(private firebase: HttpFlightsService, private router: Router) {}

  ngOnInit() {
    // Carica i dati dei voli
    this.firebase.getFlights('http://localhost:8080/voli/getData').subscribe(
      (data: any) => {
        this.voli = Object.values(data);
        console.log(this.voli);
      },
      (error) => {
        console.error('Errore nel recuperare i dati dei voli:', error);
      }
    );
  }

  // Metodo per aggiungere un volo
  addVolo(formData: any, event: Event, form: NgForm) {
    event.preventDefault();

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // 1. Validazione del numero volo (es. KLM891)
    const numeroVoloRegex = /^[A-Za-z]{3}\d{3,4}$/;
    if (!numeroVoloRegex.test(formData.numeroVolo)) {
      alert('Il numero del volo deve essere nel formato corretto (es. KLM891).');
      this.isSubmitting = false;
      return;
    }

    // 2. Validazione della compagnia aerea (alfanumerico con spazi)
    const compagniaAereaRegex = /^[A-Za-z0-9\s]+$/;
    if (!compagniaAereaRegex.test(formData.compagniaAerea)) {
      alert('La compagnia aerea deve essere una stringa alfanumerica.');
      this.isSubmitting = false;
      return;
    }

    // Regex per destinazione e partenza (Codice - Nome)
      const destinazioneRegex = /^[A-Za-z]{3} - [A-Za-z\s]+$/;
    if (!destinazioneRegex.test(formData.destinazione)) {
      alert('La destinazione deve essere una stringa alfanumerica.');
      this.isSubmitting = false;
      return;
    }

    // 4. Validazione del check-in (formato hh:mm AM/PM)
    const checkinRegex = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
    if (!checkinRegex.test(formData.checkin)) {
      alert('L\'orario di check-in deve essere nel formato corretto (es. 02:30 PM).');
      this.isSubmitting = false;
      return;
    }

    // 5. Validazione del gate (alfanumerico)
    const gateRegex = /^[A-Za-z0-9]+$/;
    if (!gateRegex.test(formData.gate)) {
      alert('Il gate deve essere una stringa alfanumerica.');
      this.isSubmitting = false;
      return;
    }

    // 6. Validazione dell'URL del logo
    const logoRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (formData.logo && !logoRegex.test(formData.logo)) {
      alert('L\'URL del logo non è valido.');
      this.isSubmitting = false;
      return;
    }

    // 7. Validazione della partenza (alfanumerico con spazi e trattini)
    const partenzaRegex = /^[A-Za-z]{3} - [A-Za-z\s]+$/;
    if (!partenzaRegex.test(formData.partenza)) {
      alert('La partenza deve essere una stringa alfanumerica.');
      this.isSubmitting = false;
      return;
    }

    // 8. Validazione dello status (alfabetico con spazi)
    const statusRegex = /^[A-Za-z\s]+$/;
    if (!statusRegex.test(formData.status)) {
      alert('Lo status deve essere una stringa alfabetica.');
      this.isSubmitting = false;
      return;
    }

    console.log("Dati ricevuti:", formData);

    const nuovoVolo = {
      numeroVolo: formData.numeroVolo,
      compagniaAerea: formData.compagniaAerea,
      destinazione: formData.destinazione,
      checkin: formData.checkin,
      gate: formData.gate,
      logo: formData.logo,
      partenza: formData.partenza,
      status: formData.status
    };

    this.firebase.postFlight('http://localhost:8080/voli/postData', nuovoVolo).subscribe(
      (response) => {
        console.log('Dati dei voli salvati con successo:', response);
        this.isSubmitting = false;

        // Reset del form e messaggio di successo, senza reindirizzare
        form.reset();
        alert('Volo aggiunto con successo! Ora puoi aggiungerne un altro.');
      },
      (error) => {
        console.error('Errore nel salvataggio dei dati dei voli:', error);
        this.isSubmitting = false;
      }
    );

    console.log('Dati inviati:', nuovoVolo);
  }





}

