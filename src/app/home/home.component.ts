import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<h3>Home Page</h3>`,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
