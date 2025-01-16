import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../../../shared/services/helpers/alerts.service';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  menu: string;
  users: any[];
  roles: any[];
  user: any;
  userForm: FormGroup;

  constructor(private usersService: UserService, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.onGetUsers();
    this.onInitializeSelectionData();
    this.onCreateForm();
  }


  onChangeMenu(menu: string, id?: number): void {
    this.menu = menu;
    if (menu == 'details' && id) {
      this.onGetUserById(id)
    }
  }

  // vehicle list
  onGetUsers(): void {
    this.usersService.getUsers().subscribe({
      next: res => this.users = res,
      error: e => this.onShowErrorAlert()
    })
  }

  // vehicle details
  onGetUserById(id: number): void {
    this.usersService.getUserById(id).subscribe({
      next: res => this.user = res
    })
  }

  // create vehicle
  onInitializeSelectionData(): void {
    this.roles = [{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }];
  }

  onCreateForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      roleId: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    debugger;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      roleId
    } = this.userForm.value;
    const user = {
      firstName,
      lastName,
      email,
      phoneNumber,
      roleId: +roleId,
    }

    this.usersService.createUser(user).subscribe({
      next: res => {
        this.alertsService.showSuccessAlert();
        this.onChangeMenu('list');
      },
      error: e => {
        this.alertsService.showErrorAlert();
        this.onChangeMenu('list');
      }
    })
  }

  // helpers
  onShowErrorAlert(): void {
    this.alertsService.showErrorAlert();
  }
}
