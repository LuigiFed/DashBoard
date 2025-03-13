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
      "image": "https://happywall-img-gallery.imgix.net/62553/pink_paris_limited.jpg"
    },
    {
      "destination": "Tokyo, Japan",
      "season": "spring",
      "reason": "The cherry blossom season makes the city spectacular for walks and festivals.",
      "image": "https://images6.alphacoders.com/874/thumb-1920-874982.jpg"
    },
    {
      "destination": "Santorini, Greece",
      "season": "summer",
      "reason": "Crystal-clear waters, breathtaking sunsets, and a relaxing atmosphere.",
      "image": "https://media.istockphoto.com/id/166471469/photo/architecture-of-oia-town-on-santorini.jpg?s=612x612&w=0&k=20&c=hcr_qpS22AkPk2Kf0ERiUKXBrxBGvtgrbK3hq-vcKCk="
    },
    {
      "destination": "Reykjavik, Iceland",
      "season": "summer",
      "reason": "Long days, cool weather, and the chance to explore stunning landscapes.",
      "image": "https://img.goodfon.com/wallpaper/big/2/fb/islandiya-reykyavik-gorod.webp"
    },
    {
      "destination": "New York, USA",
      "season": "autumn",
      "reason": "The foliage in the parks makes the city even more charming.",
      "image": "https://welcome-to-times-square.com/wp-content/uploads/2022/09/New-Project-1.png"
    },
    {
      "destination": "Munich, Germany",
      "season": "autumn",
      "reason": "Oktoberfest and a traditional atmosphere perfect for beer lovers.",
      "image": "https://media.istockphoto.com/id/612239262/photo/two-hands-clinking-beer-glasses-in-octoberfest-marquee.jpg?s=612x612&w=0&k=20&c=DfUIBpfQ5txPAum_MdQi8ypij-fjBQSsYbHm2uYSvuc="
    },
    {
      "destination": "Dubai, UAE",
      "season": "winter",
      "reason": "Ideal weather to escape the cold and enjoy luxury and beaches.",
      "image": "https://maughons.com/cdn/shop/products/dubai-at-night-wallpaper-mural-custom-sizes-available-household-wallpaper-maughons-775462_1024x1024.jpg?v=1668295026"
    },
    {
      "destination": "Aspen, USA",
      "season": "winter",
      "reason": "Perfect destination for skiers and snow lovers with incredible slopes.",
      "image": "https://as2.ftcdn.net/v2/jpg/04/86/18/05/1000_F_486180570_MFnJNSB2NYJlprkGX2VTmOCpk8Y72bOO.jpg"
    },
    {
      "destination": "Bali, Indonesia",
      "season": "summer",
      "reason": "Sunset views, tropical beaches, and a vibrant culture.",
      "image": "https://media.istockphoto.com/id/653953140/photo/hindu-temple-in-bali.jpg?s=612x612&w=0&k=20&c=ysj3S2kV1ZgCr4QZWDzjvHRowCI3-cR1xQNnqE8-BS4="
    },
    {
      "destination": "Sydney, Australia",
      "season": "summer",
      "reason": "Beautiful beaches, stunning landscapes, and a vibrant culture.",
      "image": "https://wallpapercat.com/w/full/0/5/4/295117-1920x1200-desktop-hd-sydney-background-photo.jpg"
    }
  ];


  constructor() { }

  getTravelSuggestions(): Observable<any[]> {
    return of(this.travelSuggestions);
  }
}
