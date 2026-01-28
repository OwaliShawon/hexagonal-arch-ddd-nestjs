import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from '../../application/cqrs/commands/create-alarm.command';

interface CreateAlarmRequest {
  name: string;
  severity: string;
  triggeredAt: string;
  items: Array<{ name: string; type: string }>;
}

interface GetAlarmsRequest {
  // Add filters as needed
}

@Controller()
export class AlarmsGrpc {
  constructor(private readonly alarmsService: AlarmsService) {}

  @GrpcMethod('AlarmsService', 'CreateAlarm')
  async createAlarm(data: CreateAlarmRequest) {
    return this.alarmsService.create(
      new CreateAlarmCommand(
        data.name,
        data.severity,
        new Date(data.triggeredAt),
        data.items,
      ),
    );
  }

  @GrpcMethod('AlarmsService', 'GetAlarms')
  async getAlarms(data: GetAlarmsRequest) {
    return {
      alarms: await this.alarmsService.findAll(),
    };
  }
}
