import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // openCityDialog(): void {
  //   const dialogRef = this.dialog.open(CityDialogComponent, {
  //     width: '400px',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     console.log('The dialog was closed');
  //     console.log(result); // new city object or undefined if dialog was closed without creating a city
  //   });
  // } pogledati componentu city-dialog u ass1-DICE

}
