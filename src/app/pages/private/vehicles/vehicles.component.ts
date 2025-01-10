import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../../shared/services/vehicles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  standalone: false,

  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  menu: string;
  vehicles: any[];
  vehicle: any;
  vehicleForm: FormGroup;

  constructor(private vehiclesService: VehiclesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.onGetVehicles();
    this.onCreateForm();
  }


  onChangeMenu(menu: string, id?: number): void {
    this.menu = menu;

    if (menu == 'details' && id) {
      this.onGetVehicleById(id)
    }
  }

  onGetVehicles(): void {
    this.vehiclesService.getVehicles().subscribe({
      next: res => this.vehicles = res
    })
  }

  onGetVehicleById(id: number): void {
    this.vehiclesService.getVehicleById(id).subscribe({
      next: res => this.vehicle = res
    })
  }

  onCreateForm(): void {
    // Initialize the form
    this.vehicleForm = this.formBuilder.group({
      name: ['', Validators.required],
      vin: ['', Validators.required],
      productionYear: ['', Validators.required],
      vehicleModelId: ['', Validators.required],
      producerId: ['', Validators.required],
      vehicleTypeId: ['', Validators.required]
    });
  }
}
