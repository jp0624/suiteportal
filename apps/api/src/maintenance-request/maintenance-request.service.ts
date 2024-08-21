import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import {
  MaintenanceRequestDao,
  MaintenanceRequestDB,
} from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {
  constructor(private readonly maintReqDao: MaintenanceRequestDao) {
    //
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async closeMaintenanceRequest(id: string) {
    return await this.maintReqDao.closeMaintenanceRequest(id);
  }

  async openMaintenanceRequest(id: string) {
    return await this.maintReqDao.openMaintenanceRequest(id);
  }
  async deleteMaintenanceRequest(id: string) {
    return await this.maintReqDao.deleteMaintenanceRequest(id);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.getMaintenanceRequest(id);
  }
  async getMaintenanceRequests(): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.getMaintenanceRequests();
  }
}
