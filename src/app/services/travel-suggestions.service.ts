import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelSuggestionsService {


  private travelSuggestions = [
    {
      "destination": "Paris, France",
      "season": "spring",
      "reason": "Perfect for a romantic getaway with mild weather.",
      "image": "icons/pink_paris_limited.webp"
    },
    {
      "destination": "Tokyo, Japan",
      "season": "spring",
      "reason": "The cherry blossom season makes the city spectacular for walks and festivals.",
      "image": "icons/japan.webp"
    },
    {
      "destination": "Santorini, Greece",
      "season": "summer",
      "reason": "Crystal-clear waters, breathtaking sunsets, and a relaxing atmosphere.",
      "image": "icons/santorini.webp"
    },
    {
      "destination": "Reykjavik, Iceland",
      "season": "summer",
      "reason": "Long days, cool weather, and the chance to explore stunning landscapes.",
      "image": "icons/islandiya-reykyavik-gorod.webp"
    },
    {
      "destination": "New York, USA",
      "season": "autumn",
      "reason": "The foliage in the parks makes the city even more charming.",
      "image": "icons/time-square.webp"
    },
    {
      "destination": "Munich, Germany",
      "season": "autumn",
      "reason": "Oktoberfest and a traditional atmosphere perfect for beer lovers.",
      "image": "icons/germany.webp"
    },
    {
      "destination": "Dubai, UAE",
      "season": "winter",
      "reason": "Ideal weather to escape the cold and enjoy luxury and beaches.",
      "image": "icons/dubai.webp"
    },
    {
      "destination": "Aspen, USA",
      "season": "winter",
      "reason": "Perfect destination for skiers and snow lovers with incredible slopes.",
      "image": "icons/aspen.webp"
    },
    {
      "destination": "Bali, Indonesia",
      "season": "summer",
      "reason": "Sunset views, tropical beaches, and a vibrant culture.",
      "image": "icons/bali.webp"
    },
    {
      "destination": "Sydney, Australia",
      "season": "summer",
      "reason": "Beautiful beaches, stunning landscapes, and a vibrant culture.",
      "image": "icons/sydney.webp"
    }
  ];


  constructor() { }

  getTravelSuggestions(): Observable<any[]> {
    return of(this.travelSuggestions);
  }
}
