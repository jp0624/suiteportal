// import { Test, TestingModule } from '@nestjs/testing';
// import { AdminComponent } from './admin.component';
// import { FormBuilder } from '@angular/forms';
// import { of } from 'rxjs';
// import { HttpService } from '@nestjs/common';

// describe('AdminComponent', () => {
//   let component: AdminComponent;
//   let httpService: HttpService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AdminComponent, FormBuilder, HttpService],
//     }).compile();

//     component = module.get<AdminComponent>(AdminComponent);
//     httpService = module.get<HttpService>(HttpService);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize loginStatus from localStorage', () => {
//     localStorage.setItem('login', 'true');
//     component.ngOnInit();
//     expect(component.loginStatus).toBe('true');
//   });

//   it('should logout and clear loginStatus in localStorage', () => {
//     localStorage.setItem('login', 'true');
//     component.adminLogout();
//     expect(localStorage.getItem('login')).toBeNull();
//     expect(component.loginStatus).toBe('false');
//   });

//   it('should login successfully with correct credentials', () => {
//     component.adminLoginForm.setValue({ username: 'admin', password: 'admin' });
//     component.adminLogin();
//     expect(localStorage.getItem('login')).toBe('true');
//     expect(component.loginStatus).toBe('true');
//   });

//   it('should fail login with incorrect credentials', () => {
//     component.adminLoginForm.setValue({
//       username: 'wrong',
//       password: 'credentials',
//     });
//     component.adminLogin();
//     expect(localStorage.getItem('login')).toBe('false');
//     expect(component.loginStatus).toBe('false');
//   });

//   it('should send a request to close a maintenance request', async () => {
//     const requestId = '1';
//     const mockRequests = [{ id: '1', status: 'open' }];
//     component.maintenanceRequests = mockRequests;

//     // Mock the sendRequest method
//     (component as any).sendRequest = jest.fn().mockResolvedValue(undefined);

//     await component.closeRequest(requestId);

//     expect(component.maintenanceRequests[0].status).toBe('closed');
//     expect((component as any).sendRequest).toHaveBeenCalledWith(
//       `/api/maintenance-requests/${requestId}/close`,
//       'POST'
//     );
//   });

//   it('should send a request to open a maintenance request', async () => {
//     const requestId = '1';
//     const mockRequests = [{ id: '1', status: 'closed' }];
//     component.maintenanceRequests = mockRequests;

//     // Mock the sendRequest method
//     (component as any).sendRequest = jest.fn().mockResolvedValue(undefined);

//     await component.openRequest(requestId);

//     expect(component.maintenanceRequests[0].status).toBe('open');
//     expect((component as any).sendRequest).toHaveBeenCalledWith(
//       `/api/maintenance-requests/${requestId}/open`,
//       'POST'
//     );
//   });

//   it('should send a request to delete a maintenance request', async () => {
//     const requestId = '1';
//     const mockRequests = [{ id: '1', status: 'open' }];
//     component.maintenanceRequests = mockRequests;

//     // Mock the sendRequest method
//     (component as any).sendRequest = jest.fn().mockResolvedValue(undefined);

//     await component.deleteRequest(requestId);

//     expect(component.maintenanceRequests.length).toBe(0);
//     expect((component as any).sendRequest).toHaveBeenCalledWith(
//       `/api/maintenance-requests/${requestId}/delete`,
//       'DELETE'
//     );
//   });

//   it('should log an error if sendRequest fails', async () => {
//     const errorSpy = jest.spyOn(console, 'error').mockImplementation();

//     // Extend the global object with fetch
//     global.fetch = jest.fn().mockResolvedValue({
//       ok: false,
//       status: 500,
//       json: jest.fn().mockResolvedValue({}),
//     } as any);

//     expect(errorSpy).toHaveBeenCalledWith(
//       expect.stringContaining('Error while handling request:')
//     );
//   });
// });

// // Add this declaration at the top or in a separate typings file

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace NodeJS {
//     interface Global {
//       fetch: jest.Mock;
//     }
//   }
// }
