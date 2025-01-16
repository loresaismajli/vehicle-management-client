import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccidentsService } from '../../../shared/services/accidents.service';
import { AlertsService } from '../../../shared/services/helpers/alerts.service';
import { VehiclesService } from '../../../shared/services/vehicles.service';

@Component({
  selector: 'app-services',
  standalone: false,

  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  menu: string;
  services: any[];
  serviceTypes: any[];
  vehicles: any[];
  service: any;
  serviceForm: FormGroup;

  constructor(private accidentsService: AccidentsService, private vehiclesService: VehiclesService, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.onGetServices();
    this.onCreateForm();
  }


  onChangeMenu(menu: string, id?: number): void {
    this.menu = menu;
    if (menu == 'details' && id) {
      this.onGetServiceById(id)
    }
  }

  // vehicle list
  onGetServices(): void {
    this.accidentsService.getServices().subscribe({
      next: res => this.services = res,
      error: e => this.onShowErrorAlert()
    })
  }

  // vehicle details
  onGetServiceById(id: number): void {
    this.accidentsService.getServiceById(id).subscribe({
      next: res => this.service = res
    })
  }



  // create vehicle
  onCreateForm(): void {
    this.vehiclesService.getVehicles().subscribe({
      next: res => {
        this.vehicles = res.map(e => {
          const obj = { id: e.id, name: e.name };
          return obj;
        });
        this.serviceTypes = [{id: 1, name: 'Basic Service'}, {id: 2, name: 'Advanced Service'},]
        this.serviceForm = new FormGroup({
          number: new FormControl('', Validators.required),
          name: new FormControl('', Validators.required),
          userId: new FormControl('', Validators.required),
          vehicleId: new FormControl('', Validators.required),
          serviceTypeId: new FormControl('', Validators.required),
          date: new FormControl('', Validators.required),
          totalPrice: new FormControl('', Validators.required),
        });
      }
    })
  }

  onSubmit(): void {
    const {
      number,
      name,
      userId,
      vehicleId,
      serviceTypeId,
      date,
      totalPrice,
    } = this.serviceForm.value;
    const service = {
      number,
      name,
      userId: +userId,
      vehicleId: +vehicleId,
      serviceTypeId: +serviceTypeId,
      date,
      totalPrice: +totalPrice,
    }

    this.accidentsService.createService(service).subscribe({
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
