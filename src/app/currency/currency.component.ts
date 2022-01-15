import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})

export class CurrencyComponent implements OnInit {
// @ViewChild('myInput', {static: true}) myInput: ElementRef;

  currency: OneCurrency = {name: "UAH", costInUSD: 0, costInRUB: 0, costInEUR:0,costInBTC:0}

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
 this.httpClient.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5').subscribe((data: any)=>{
console.log(data)
    })
  }
  convert(): void{
  this.httpClient.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5').subscribe((data: any)=>{
  this.currency.costInUSD = data[0].buy
  this.currency.costInEUR = data[1].buy
  this.currency.costInRUB = data[2].buy
  this.currency.costInBTC = data[3].buy * data[0].buy
      })
  }
}


export interface OneCurrency {
  name: string;
  costInUSD: number;
  costInEUR: number;
  costInBTC: number;
  costInRUB: number;
}
