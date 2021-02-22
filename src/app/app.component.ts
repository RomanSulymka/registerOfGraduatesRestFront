import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Graduated } from './graduated';
import { GraduatedService } from './graduated.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public graduates: Graduated[];
  public editGraduated: Graduated;

  constructor(private graduatedService: GraduatedService){}

  ngOnInit(){
    this.getGraduates();
  }

  public getGraduates(): void {
    this.graduatedService.getGraduates().subscribe(
      (response: Graduated[]) => {
        this.graduates = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddGraduated(addForm: NgForm): void {
    document.getElementById('add-graduated-form').click();
    this.graduatedService.addGraduated(addForm.value).subscribe(
      (response: Graduated) => {
        console.log(response);
        this.getGraduates();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateGraduated(graduated: Graduated): void {
    this.graduatedService.updateGraduated(graduated).subscribe(
      (response: Graduated) => {
        console.log(response);
        this.getGraduates();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(graduated: Graduated, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
     button.setAttribute('data-target', '#addGraduatedModal');
    }

    if (mode === 'edit'){
      this.editGraduated = graduated;
      button.setAttribute('data-target', '#updateGraduatedModal');
    }

    if (mode === 'delete'){
      button.setAttribute('data-target', '#deleteGraduatedModal');
    }
    container.appendChild(button);
    button.click();
  }
}
