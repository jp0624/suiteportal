import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
// import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json');
const db = low(adapter);
// const adapter = new FileAsync<MaintenanceRequestDB>('./db/maint-requests.json')
// const db = low(adapter).then(db => {});

db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {
  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        submittedAt: new Date(),
      })
      .write();
    return id;
  }
  async closeMaintenanceRequest(id: string) {
    console.log('closing request: ', id);
    return await this.collection
      .find({ id: id })
      .assign({ status: 'closed' })
      .write();
  }
  async openMaintenanceRequest(id: string) {
    console.log('opening request: ', id);
    return await this.collection
      .find({ id: id })
      .assign({ status: 'open' })
      .write();
  }

  async deleteMaintenanceRequest(id: string) {
    return await this.collection.remove({ id }).write();
  }
  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.find({ id }).value();
  }
  async getMaintenanceRequests(): Promise<MaintenanceRequestDB> {
    return await this.collection;
  }
}
