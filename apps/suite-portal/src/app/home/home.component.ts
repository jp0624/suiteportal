import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
// import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  maintenanceRequestForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    unitNumber: ['', Validators.required],
    serviceType: ['', Validators.required],
    summary: ['', Validators.required],
    details: ['', Validators.required],
  });
  submittedRequest = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    //
  }
  async submitRequest() {
    try {
      const response = await fetch('/api/maintenance-requests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...this.maintenanceRequestForm.value,
          status: 'open',
        }),
      });

      if (response.ok) {
        this.submittedRequest = true;
        this.maintenanceRequestForm.reset();
        console.log('Successfully submitted maintenance request');
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
    }
  }

  ngOnInit(): void {
    //
  }
}
