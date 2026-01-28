import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AlarmsService } from '../../application/alarms.service';

@Injectable()
export class AlarmsEventListener {
  constructor(private readonly alarmsService: AlarmsService) {}

  @OnEvent('alarm.trigger')
  async handleAlarmTrigger(payload: {
    name: string;
    severity: string;
    triggeredAt: Date;
    items: Array<{ name: string; type: string }>;
  }) {
    // Handle external event that triggers alarm creation
    // This demonstrates hexagonal architecture's event-driven input port
    console.log('Alarm triggered via event:', payload);
  }

  @OnEvent('alarm.acknowledge')
  async handleAlarmAcknowledge(payload: { alarmId: string }) {
    // Handle alarm acknowledgment events
    console.log('Alarm acknowledged via event:', payload);
  }
}
