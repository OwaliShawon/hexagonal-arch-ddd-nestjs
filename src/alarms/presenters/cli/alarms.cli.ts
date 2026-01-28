import { Injectable } from '@nestjs/common';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from '../../application/cqrs/commands/create-alarm.command';

@Injectable()
export class AlarmsCli {
  constructor(private readonly alarmsService: AlarmsService) {}

  /**
   * CLI command to create an alarm
   * Example usage: node cli.js create-alarm --name "High CPU" --severity critical
   */
  async createAlarm(args: {
    name: string;
    severity: string;
    triggeredAt?: string;
    items?: Array<{ name: string; type: string }>;
  }) {
    const triggeredAt = args.triggeredAt
      ? new Date(args.triggeredAt)
      : new Date();
    const items = args.items || [];

    const result = await this.alarmsService.create(
      new CreateAlarmCommand(args.name, args.severity, triggeredAt, items),
    );

    console.log('Alarm created:', result);
    return result;
  }

  /**
   * CLI command to list all alarms
   * Example usage: node cli.js list-alarms
   */
  async listAlarms() {
    const alarms = await this.alarmsService.findAll();
    console.log('Alarms:', JSON.stringify(alarms, null, 2));
    return alarms;
  }
}
