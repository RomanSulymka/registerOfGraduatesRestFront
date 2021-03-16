import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Work } from './work';
import { WorkService } from './work.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  public works: Work[];
  public editWork: Work;
  public deleteWork: Work;
  public findWork: Work;

  constructor(private workService: WorkService) { }

  ngOnInit(): void {
    this.getWorks();
  }

  public getWorks(): void {
    this.workService.getWorks().subscribe(
      (response: Work[]) => {
        this.works = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddWork(addForm: NgForm): void {
    document.getElementById('add-work-form').click();
    this.workService.addWork(addForm.value).subscribe(
      (response: Work) => {
        console.log(response);
        this.getWorks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateWork(work: Work): void {
    this.workService.updateWork(work).subscribe(
      (response: Work) => {
        console.log(response);
        this.getWorks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteWork(workId: number): void {
    this.workService.deleteWork(workId).subscribe(
      (response: void) => {
        console.log(response);
        this.getWorks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onFindWork(workId: number): void {
    this.workService.findWork(workId).subscribe(
      (response: void) => {
        console.log(response);
        this.getWorks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchWorks(key: string): void {
    console.log(key);
    const results: Work[] = [];
    for (const work of this.works){
      if (work.company.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || work.position.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(work);
      }
    }
    this.works = results;
    if (results.length === 0 || !key){
      this.getWorks();
    }
  }

  public onOpenModal(work: Work, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
     button.setAttribute('data-target', '#addWorkModal');
    }

    if (mode === 'edit'){
      this.editWork = work;
      button.setAttribute('data-target', '#updateWorkModal');
    }

    if (mode === 'delete'){
      this.deleteWork = work;
      button.setAttribute('data-target', '#deleteWorkModal');
    }
    if (mode === 'find'){
      this.findWork = work;
      button.setAttribute('data-target', '#findWorkModal');
    }
    container.appendChild(button);
    button.click();
  }
}
