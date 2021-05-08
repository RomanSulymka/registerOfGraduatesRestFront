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
  private deleteDialogComponent = DeleteDialogComponent;
  private deleteUserDialog = DeleteUserDialog;
  private createUserComponent = CreateUserComponent;
  private createGraduateComponent = CreateGraduateComponent;

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

  // Delete User Data
  public deleteUserRecord(id, username, password, email, role) {
    this.dialog.open(this.deleteUserDialog, {
      data: {id: id, username: username, password: password, email: email, role: role}
    });
  }

  //Update Graduate Data
  public editRecordGraduate(idGraduate, firstName, middleName, lastName, emailGraduate, jobTitle, gender) {
    this.dialog.open(this.updateGraduateDialog, {
      data: {id: idGraduate, firstName: firstName, middleName: middleName, lastName: lastName, email: emailGraduate,
             jobTitle: jobTitle, gender: gender, dataSource: this.dataSource}
    });
  }

  //Delete Graduate
  public deleteGraduate(idGraduate, firstName, middleName, lastName, emailGraduate, jobTitle, gender) {
   this.dialog.open(this.deleteDialogComponent, {
      data: {id: idGraduate, firstName: firstName, middleName: middleName, lastName: lastName, email: emailGraduate,
              jobTitle: jobTitle, gender: gender}
    });
  }

  openAddDialog() {
    this.dialog.open(this.createUserComponent, {
      data: {User: {} }
    });
  }

  openAddGraduateDialog() {
    this.dialog.open(this.createGraduateComponent, {
      data: {Graduate: {} }
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

@Component({
  selector: 'app-delete.dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public graduateService: GraduatedService) { }
  
    public graduates: Graduated[];

    public getGraduates(): void {
    this.graduateService.getGraduates().subscribe(
      (response: Graduated[]) => {
        this.graduates = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmDelete(userId: number): void {
    this.graduateService.deleteGraduated(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getGraduates();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

@Component({
  selector: 'user-delete.dialog',
  templateUrl: 'user-delete-dialog.html',
})
export class DeleteUserDialog {

  constructor(public dialogRef: MatDialogRef<DeleteUserDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) { }
  
  public users: User[];

  onNoClick(): void {
    this.dialogRef.close();
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

  public confirmDelete(userId: number): void {
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
}


@Component({
  templateUrl: 'create-user-dialog.html',
})

export class CreateUserComponent {
  hide = true;
  selectedValue = this.data.role;
  rolesList;

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,public userService: UserService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

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

  public confirmAdd(): void {
    this.userService.addUser(this.data);
  }

  GetRoleById(event) {
    this.userService.findRole(Number(event.target.value)).subscribe(rolesList => {
      this.rolesList = rolesList;
    });
  }
}

@Component({
  templateUrl: 'create-graduate-dialog.html',
})
export class CreateGraduateComponent {
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Graduated,public graduateService: GraduatedService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

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

  public confirmAdd(): void {
    this.graduateService.addGraduated(this.data);
  }
}