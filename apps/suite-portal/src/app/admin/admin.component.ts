import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
  selector: 'pm-home',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  adminLoginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  adminCredentials = {
    username: 'admin',
    password: environment.adminPassword,
  };
  maintenanceRequests: any = [];
  loginStatus = localStorage.getItem('login') || 'false';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    //
  }
  ngOnInit(): void {
    //
    console.log('run login');
    this.adminLogin();
  }
  adminLogout(): void {
    console.log('logout');
    localStorage.removeItem('login');
    this.loginStatus = 'false';
  }

  adminLogin(): void {
    if (
      localStorage.getItem('login') === 'true' ||
      (this.adminLoginForm.value.username === this.adminCredentials.username &&
        this.adminLoginForm.value.password === this.adminCredentials.password)
    ) {
      localStorage.setItem('login', 'true');
      this.loginStatus = 'true';
      this.getRequests();
      console.log('login successful');
    } else {
      localStorage.setItem('login', 'false');
      this.loginStatus = 'false';
      console.log('login failed');
    }
  }

  private async sendRequest(url: string, method: string): Promise<void> {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${method} ${url}`);
      }
    } catch (error) {
      console.error(`Error while handling request: ${error}`);
    }
  }

  async closeRequest(requestId: string): Promise<void> {
    const url = `/api/maintenance-requests/${requestId}/close`;
    await this.sendRequest(url, 'POST');

    this.maintenanceRequests = this.maintenanceRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'closed' } : request
    );
  }

  async openRequest(requestId: string): Promise<void> {
    const url = `/api/maintenance-requests/${requestId}/open`;
    await this.sendRequest(url, 'POST');

    this.maintenanceRequests = this.maintenanceRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'open' } : request
    );
  }

  async deleteRequest(requestId: string): Promise<void> {
    const url = `/api/maintenance-requests/${requestId}/delete`;
    await this.sendRequest(url, 'DELETE');

    this.maintenanceRequests = this.maintenanceRequests.filter(
      (request) => request.id !== requestId
    );
  }

  getRequests(): void {
    //
    this.http.get('/api/maintenance-requests/').subscribe((response) => {
      console.log('response: ', response);
      this.maintenanceRequests = response;
    });
  }
}
