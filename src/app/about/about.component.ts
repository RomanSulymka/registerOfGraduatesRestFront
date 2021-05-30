import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false;

  constructor() { }

  ngOnInit(): void {
  }

}
