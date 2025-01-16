import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../../shared/services/vehicles.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../../../shared/services/helpers/alerts.service';

@Component({
  selector: 'app-vehicles',
  standalone: false,

  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  menu: string;
  vehicles: any[];
  vehicleModels: any[];
  vehicleTypes: any[];
  producers: any[];
  vehicle: any;
  vehicleForm: FormGroup;

  constructor(private vehiclesService: VehiclesService, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.onGetVehicles();
    this.onInitializeSelectionData();
    this.onCreateForm();
  }


  onChangeMenu(menu: string, id?: number): void {
    this.menu = menu;
    if (menu == 'details' && id) {
      this.onGetVehicleById(id)
    }
  }

  // vehicle list
  onGetVehicles(): void {
    this.vehiclesService.getVehicles().subscribe({
      next: res => this.vehicles = res,
      error: e => this.onShowErrorAlert()
    })
  }

  // vehicle details
  onGetVehicleById(id: number): void {
    this.vehiclesService.getVehicleById(id).subscribe({
      next: res => this.vehicle = res
    })
  }

  // create vehicle
  onInitializeSelectionData(): void {
    this.vehicleModels = [{ id: 1, name: 'Camry' }, { id: 2, name: 'Corolla' }];
    this.vehicleTypes = [{ id: 1, name: 'Sedan' }, { id: 2, name: 'SUV' }];
    this.producers = [{ id: 1, name: 'ABC Corp' }];
  }

  onCreateForm(): void {
    this.vehicleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      vin: new FormControl('', Validators.required),
      productionYear: new FormControl('', Validators.required),
      vehicleModelId: new FormControl('', Validators.required),
      producerId: new FormControl('', Validators.required),
      vehicleTypeId: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    const {
      name,
      vin,
      productionYear,
      vehicleModelId,
      producerId,
      vehicleTypeId,
    } = this.vehicleForm.value;
    const vehicle = {
      name,
      vin,
      productionYear: +productionYear,
      vehicleModelId: +vehicleModelId,
      producerId: +producerId,
      vehicleTypeId: +vehicleTypeId,
    }

    this.vehiclesService.createVehicle(vehicle).subscribe({
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
