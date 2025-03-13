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
  lastNews: any[] = [
    {
      titolo: "Ritardi nei voli estivi",
      descrizione: "Secondo i dati diffusi da AirHelp, tra giugno e agosto 2024, oltre il 45% dei voli in partenza dall'Italia ha subito disagi, interessando più di 928.000 viaggiatori.",
      fonte: "ttgitalia.com",
      data: "2024-03-09"
    },
    {
      titolo: "Dichiarazioni del presidente dell'Enac",
      descrizione: "Pierluigi Di Palma, presidente dell'Ente Nazionale per l'Aviazione Civile, ha affermato che nel 2024 il sistema italiano ha registrato una crescita significativa. Ha inoltre sottolineato che l'aumento delle tariffe aeree è stato percepito principalmente in alcuni giorni di picco.",
      fonte: "corriere.it",
      data: "2024-03-05"
    },
    {
      titolo: "Problemi ai radar e disagi al Nord Italia",
      descrizione: "Un guasto ai sistemi radar di ENAV ha causato disagi negli aeroporti del Nord Italia, tra cui ritardi, cancellazioni e dirottamenti di voli.",
      fonte: "tg24.sky.it",
      data: "2024-10-20"
    },
    {
      titolo: "Cancellazioni e ritardi estivi",
      descrizione: "Gli aeroporti italiani hanno registrato oltre 3.600 voli cancellati, con un picco di 377 cancellazioni il 17 luglio, giorno di uno sciopero nazionale.",
      fonte: "ilsole24ore.com",
      data: "2024-07-17"
    },
    {
      titolo: "Situazione degli aeroporti italiani",
      descrizione: "Nel periodo gennaio-giugno 2023, gli aeroporti italiani hanno gestito 89,5 milioni di passeggeri, riportando i livelli di traffico aerei ai valori pre-pandemia.",
      fonte: "theflightclub.it",
      data: "2023-08-01"
    },
    {
      titolo: "Nuove rotte aeree per l'Italia",
      descrizione: "Alitalia annuncia nuove rotte internazionali da Roma e Milano, con destinazioni in Asia e America del Nord, con l'intento di rafforzare la propria posizione globale.",
      fonte: "repubblica.it",
      data: "2024-02-25"
    },
    {
      titolo: "Sicurezza negli aeroporti italiani",
      descrizione: "Il Ministero delle Infrastrutture ha annunciato l'introduzione di nuove misure di sicurezza negli aeroporti italiani per prevenire attacchi informatici e migliorare il controllo dei passeggeri.",
      fonte: "ansa.it",
      data: "2024-03-01"
    },
    {
      titolo: "Aeroporti italiani e sostenibilità",
      descrizione: "L'Italia si prepara a implementare nuove tecnologie ecologiche negli aeroporti, con l'obiettivo di ridurre l'impatto ambientale e l'inquinamento causato dai voli.",
      fonte: "ilsole24ore.com",
      data: "2024-02-15"
    },
    {
      titolo: "Sciopero dei piloti di Ryanair",
      descrizione: "I piloti di Ryanair in Italia hanno indetto uno sciopero per protestare contro le condizioni di lavoro, causando la cancellazione di numerosi voli da e per l'Italia.",
      fonte: "skyTG24.it",
      data: "2024-01-30"
    },
    {
      titolo: "Espansione dell'aeroporto di Milano Malpensa",
      descrizione: "L'aeroporto di Milano Malpensa annuncia una serie di lavori di ampliamento per accogliere più passeggeri e migliorare i servizi offerti, con l'obiettivo di diventare un hub internazionale.",
      fonte: "tgcom24.mediaset.it",
      data: "2024-03-03"
    },
    {
      titolo: "La ripresa del traffico aereo post-pandemia",
      descrizione: "Il traffico aereo in Italia sta tornando ai livelli pre-pandemia, con una crescita costante delle prenotazioni e una ripresa delle rotte internazionali.",
      fonte: "avionews.com",
      data: "2024-02-18"
    },
    {
      titolo: "Italia tra i primi paesi per traffico aereo europeo",
      descrizione: "Secondo i dati di Eurocontrol, l'Italia è tra i primi paesi in Europa per traffico aereo, con un aumento del numero di passeggeri e voli operativi.",
      fonte: "corriereaviation.it",
      data: "2024-01-12"
    }
  ];



  constructor (private firebase : HttpFlightsService) {}


  ngOnInit() {
  //   this.firebase.getFlights('http://localhost:8080/voli/getData').subscribe((data: any) => {

  //     this.lastNews = Object.values(data).filter((news: any) =>
  //       news.TITOLO && news.DESCRIZIONE && news.FONTE
  //     );
  //     console.log(this.lastNews);
  //   });
  // }
}


}
