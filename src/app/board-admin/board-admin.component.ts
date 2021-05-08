import { Component, OnInit, ViewChild, AfterViewInit, Inject, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user-page/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { User } from '../user-page/user';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Graduated } from '../graduated/graduated';
import { GraduatedService } from '../graduated/graduated.service';

interface Role{
  value: string;
  viewValue: string;
}

// Admin Component

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit, AfterViewInit {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  nav_position: string = 'end';
  public displayedColumns = ['id', 'username', 'email', 'role', 'update', 'delete'];
  public displayedColumnsGraduate = ['idGraduate', 'firstName', 'middleName', 'lastName', 'emailGraduate', 'jobTitle', 'gender', 'updateGraduate', 'deleteGraduate'];
  public dataSource = new MatTableDataSource<User>();
  public dataSourceGraduate = new MatTableDataSource<Graduated>();
  public users: User[];
  public editUser: User;
  public deleteUser: User;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private updateUserDialog = UpdateUserDialog;
  private updateGraduateDialog = UpdateGraduateDialog;

  constructor(private userService: UserService, public dialog: MatDialog, private graduatedService: GraduatedService) { }

  ngOnInit() {
    this.getUsers();
    this.getGraduates();
  }

  public getUsers(): void {
    this.userService.getUsers()
    .subscribe(res => {
      this.dataSource.data = res as User[];
    })
  }

  public getGraduates(): void {
    this.graduatedService.getGraduates()
    .subscribe(res => {
      this.dataSourceGraduate.data = res as Graduated[];
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSourceGraduate.sort = this.sort;
    this.dataSourceGraduate.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public customSortGraduate = (event) => {
    console.log(event);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public doFilterGraduate = (value: string) => {
    this.dataSourceGraduate.filter = value.trim().toLocaleLowerCase();
  }

  public onUpdateUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addUser(addForm: NgForm): void {
    document.getElementById('add-graduated-form').click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public deleteItem(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDialog() {
    this.dialog.open(UpdateUserDialog, {
      data: {id: this.id, username: this.username, password: this.password, email: this.email, role: this.role}
    });
  }

  // Update User Data
  public editRecord(id, username, password, email, role) {
    this.dialog.open(this.updateUserDialog, {
      data: {id: id, username: username, password: password, email: email, role: role, dataSource: this.dataSource}
    });
  }

  //Update Graduate Data
  public editRecordGraduate(idGraduate, firstName, middleName, lastName, emailGraduate, jobTitle, gender) {
    this.dialog.open(this.updateGraduateDialog, {
      data: {id: idGraduate, firstName: firstName, middleName: middleName, lastName: lastName, email: emailGraduate,
             jobTitle: jobTitle, gender: gender, dataSource: this.dataSource}
    });
  }
}

// Update User Component
@Component({
  selector: 'board-admin-update-panel',
  templateUrl: 'board-admin-update-panel.html',
})
export class UpdateUserDialog {
  constructor(private dropdownService: UserService, public dialogRef: MatDialogRef<UpdateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User, public userService: UserService) {}

    public dataSource = new MatTableDataSource<User>();
    public users: User[];
    selectedValue = this.data.role;
    hide = true;
    rolesList;

    public roles: Role[];

  formControl = new FormControl('', [
  Validators.required
  // Validators.email,
  ]);

  ngOnInit() {
    this.getUsers();

    this.dropdownService.getRoles().subscribe(rolesList => {
      this.rolesList = rolesList;
    });
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getErrorMessage() {
  return this.formControl.hasError('required') ? 'Required field' :
  this.formControl.hasError('email') ? 'Not a valid email' :
  '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
  this.dialogRef.close();
  }

  stopEdit(): void {
  this.userService.updateUser(this.data);
  }

  public updateUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  GetRoleById(event) {
    this.dropdownService.findRole(Number(event.target.value)).subscribe(rolesList => {
      this.rolesList = rolesList;
    });
  }

}

// Update Graduate Component

@Component({
  selector: 'update-graduate-dialog',
  templateUrl: 'update-graduate-dialog.html',
})
export class UpdateGraduateDialog {
  constructor(public dialogRef: MatDialogRef<UpdateGraduateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Graduated, public graduatedService: GraduatedService) {}

    public dataSource = new MatTableDataSource<Graduated>();
    public users: Graduated[];
    hide = true;


    formControl = new FormControl('', [
    Validators.required
    // Validators.email,
    ]);

  ngOnInit() {
    this.getGraduates();
  }

  public getGraduates(): void {
    this.graduatedService.getGraduates().subscribe(
      (response: Graduated[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getErrorMessage() {
  return this.formControl.hasError('required') ? 'Required field' :
  this.formControl.hasError('email') ? 'Not a valid email' :
  '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
  this.dialogRef.close();
  }

  stopEdit(): void {
  this.graduatedService.updateGraduated(this.data);
  }

  public updateGraduate(user: Graduated): void {
    this.graduatedService.updateGraduated(user).subscribe(
      (response: Graduated) => {
        console.log(response);
        this.getGraduates();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}