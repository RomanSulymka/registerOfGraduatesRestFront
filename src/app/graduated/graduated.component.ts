import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Graduated } from './graduated';
import { GraduatedService } from './graduated.service';
import { ActivatedRoute, Router, RouterLinkActive, Routes } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './graduated.component.html',
  styleUrls: ['./graduated.component.css']
})
export class GraduatedComponent implements OnInit{
  public graduates: Graduated[];
  public editGraduated: Graduated;
  public deleteGraduated: Graduated;
  public findGraduated: Graduated;
  public findInfoAboutGraduated: Graduated;
   
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

  public onDeleteGraduated(graduatedId: number): void {
    this.graduatedService.deleteGraduated(graduatedId).subscribe(
      (response: void) => {
        console.log(response);
        this.getGraduates();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onInfoAboutGraduated(graduated: Graduated): void {
    this.graduatedService.infoAboutGraduated(graduated).subscribe(
      (response: Graduated) => {
        console.log(response);
        this.getGraduates();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onFullInfoAboutGraduated(graduated: Graduated): void {
    this.graduatedService.fullInfoAboutGraduated(graduated).subscribe(
      (response: Graduated) => {
        console.log(response);
        this.getGraduates();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchGraduates(key: string): void {
    console.log(key);
    const results: Graduated[] = [];
    for (const graduated of this.graduates){
      if (graduated.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || graduated.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || graduated.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || graduated.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(graduated);
      }
    }
    this.graduates = results;
    if (results.length === 0 || !key){
      this.getGraduates();
    }
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
      this.deleteGraduated = graduated;
      button.setAttribute('data-target', '#deleteGraduatedModal');
    }
    if (mode === 'info'){
      this.findGraduated = graduated;
      button.setAttribute('data-target', '#infoAboutGraduatedModal');
    }
    if (mode === 'fullInfo'){
      this.findInfoAboutGraduated = graduated;
      button.setAttribute('data-target', '#fullInfoAboutGraduatedModal');
    }
    container.appendChild(button);
    button.click();
  }
}
