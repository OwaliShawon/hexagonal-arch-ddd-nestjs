import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from '../../application/cqrs/commands/create-alarm.command';

@Resolver('Alarm')
export class AlarmsResolver {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Mutation()
  async createAlarm(
    @Args('name') name: string,
    @Args('severity') severity: string,
    @Args('triggeredAt') triggeredAt: Date,
    @Args('items') items: Array<{ name: string; type: string }>,
  ) {
    return this.alarmsService.create(
      new CreateAlarmCommand(name, severity, triggeredAt, items),
    );
  }

  @Query()
  async alarms() {
    return this.alarmsService.findAll();
  }
}
