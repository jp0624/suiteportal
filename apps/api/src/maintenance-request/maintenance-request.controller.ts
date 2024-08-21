import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';

@Controller('maintenance-requests')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest
  ) {
    console.log('maintenanceRequest: ', maintenanceRequest);
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(
      maintenanceRequest
    );
  }

  @Get('/')
  public async getMaintenanceRequests() {
    return await this.maintenanceRequestService.getMaintenanceRequests();
  }

  @Get('/:id')
  public async getMaintenanceRequest(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }
  @Post('/:id/close')
  public async closeMaintenanceRequest(@Param('id') id: string) {
    console.log('closing request: ', id);
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.closeMaintenanceRequest(id);
  }
  @Post('/:id/open')
  public async openMaintenanceRequest(@Param('id') id: string) {
    console.log('opening request: ', id);
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.openMaintenanceRequest(id);
  }

  @Delete('/:id/delete')
  public async deleteMaintenanceRequest(@Param('id') id: string) {
    console.log('delete request: ', id);
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.deleteMaintenanceRequest(id);
  }
}
