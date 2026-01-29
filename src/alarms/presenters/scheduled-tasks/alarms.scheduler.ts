import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AlarmsService } from '../../application/alarms.service';

@Injectable()
export class AlarmsScheduler {
  private readonly logger = new Logger(AlarmsScheduler.name);

  constructor(private readonly alarmsService: AlarmsService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkSystemHealth() {
    // Scheduled task that monitors system health
    // This demonstrates hexagonal architecture's scheduled input port
    this.logger.debug('Running scheduled alarm health check');

    // Example: Check for stale alarms or trigger maintenance alarms
    const alarms = await this.alarmsService.findAll();
    this.logger.debug(`Current active alarms: ${alarms.length}`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupOldAlarms() {
    // Scheduled cleanup task
    this.logger.log('Running scheduled alarm cleanup');
  }
}
