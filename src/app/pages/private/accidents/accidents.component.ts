import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccidentsService } from '../../../shared/services/accidents.service';
import { AlertsService } from '../../../shared/services/helpers/alerts.service';
import { VehiclesService } from '../../../shared/services/vehicles.service';

@Component({
  selector: 'app-accidents',
  standalone: false,

  templateUrl: './accidents.component.html',
  styleUrl: './accidents.component.scss'
})
export class AccidentsComponent {
  menu: string;
  accidents: any[];
  vehicles: any[];
  accident: any;
  accidentForm: FormGroup;

  constructor(private accidentsService: AccidentsService, private vehiclesService: VehiclesService, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.onGetAccidents();
    this.onCreateForm();
  }


  onChangeMenu(menu: string, id?: number): void {
    this.menu = menu;
    if (menu == 'details' && id) {
      this.onGetAccidentById(id)
    }
  }

  // vehicle list
  onGetAccidents(): void {
    debugger;
    this.accidentsService.getAccidents().subscribe({
      next: res => this.accidents = res,
      error: e => this.onShowErrorAlert()
    })
  }

  // vehicle details
  onGetAccidentById(id: number): void {
    this.accidentsService.getAccidentById(id).subscribe({
      next: res => this.accident = res
    })
  }



  // create vehicle
  onCreateForm(): void {
    this.vehiclesService.getVehicles().subscribe({
      next: res => {
        this.vehicles = res.map(e => {
          const obj = {id: e.id, name: e.name};
          return obj;
        });
        this.accidentForm = new FormGroup({
          description: new FormControl('', Validators.required),
          isGuilty: new FormControl('', Validators.required),
          userId: new FormControl('', Validators.required),
          vehicleId: new FormControl('', Validators.required),
          date: new FormControl('', Validators.required),
          totalPrice: new FormControl('', Validators.required),
        });
      }
    })

  }

  onSubmit(): void {
    const {
      description,
      isGuilty,
      userId,
      vehicleId,
      date,
      totalPrice,
    } = this.accidentForm.value;
    const accident = {
      description,
      isGuilty: Boolean(isGuilty),
      userId: +userId,
      vehicleId: +vehicleId,
      date,
      totalPrice: +totalPrice,
    }

    this.accidentsService.createAccident(accident).subscribe({
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
