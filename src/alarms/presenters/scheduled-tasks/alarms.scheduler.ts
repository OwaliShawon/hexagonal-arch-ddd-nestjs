import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AlarmsService } from '../../application/alarms.service';

@Injectable()
export class AlarmsScheduler {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkSystemHealth() {
    // Scheduled task that monitors system health
    // This demonstrates hexagonal architecture's scheduled input port
    console.log('Running scheduled alarm health check');
    
    // Example: Check for stale alarms or trigger maintenance alarms
    const alarms = await this.alarmsService.findAll();
    console.log(`Current active alarms: ${alarms.length}`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupOldAlarms() {
    // Scheduled cleanup task
    console.log('Running scheduled alarm cleanup');
  }
}
