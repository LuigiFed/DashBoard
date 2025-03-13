import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;
  private leaflet: any;
  private markersLayer: any;
  private allFlights: any[] = []; // Qui salviamo tutti i dati dei voli

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      // Import dinamico di Leaflet
      const LModule = await import('leaflet');
      this.leaflet = LModule.default;
      // Importa markercluster in modo dinamico
      await import('leaflet.markercluster');

      this.initMap();
      // Usa markerClusterGroup invece di layerGroup
      this.markersLayer = this.leaflet.markerClusterGroup();
      this.map.addLayer(this.markersLayer);

      this.loadFlights();

      // Aggiorna i marker quando l'utente sposta o zooma la mappa
      this.map.on('moveend', () => {
        this.updateMarkers();
      });
    }
  }

  private initMap(): void {
    this.map = this.leaflet.map('map').setView([42.51617, -96.01290], 5);
    this.leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      minZoom: 5,
     maxZoom: 18
    }).addTo(this.map);
    this.map.on('resize', () => {
      this.map.invalidateSize();
    });
  }

  private loadFlights(): void {
    // Carica i dati dei voli dall'API OpenSky e salvali in allFlights
    this.http.get<any>('https://opensky-network.org/api/states/all').subscribe(
      (data) => {
        this.allFlights = data.states;
        this.updateMarkers(); // Aggiorna i marker solo quando i dati sono stati caricati
      },
      (error) => {
        console.error('Errore nel recuperare i dati dei voli:', error);
      }
    );
  }

  private updateMarkers(): void {
    // Rimuovi tutti i marker esistenti
    this.markersLayer.clearLayers();

    // Ottieni i confini attuali della mappa
    const bounds = this.map.getBounds();

    // Itera i dati e aggiungi solo i marker che sono all'interno dei bounds
    this.allFlights.forEach((flight: any) => {
      const lat = flight[6];
      const lon = flight[5];
      const callsign = flight[1]?.trim() || 'Sconosciuto';

      if (lat && lon && bounds.contains([lat, lon])) {
        this.leaflet.marker([lat, lon], { icon: this.getPlaneIcon() })
          .bindPopup(`✈️ <b>${callsign}</b><br>Lat: ${lat}, Lon: ${lon}`)
          .addTo(this.markersLayer);
      }
    });
  }

  private getPlaneIcon(): any {
    return this.leaflet.icon({
      iconUrl: 'https://img.icons8.com/ios-filled/50/000000/airplane-take-off.png',
      iconSize: [25, 25]
    });
  }
}
