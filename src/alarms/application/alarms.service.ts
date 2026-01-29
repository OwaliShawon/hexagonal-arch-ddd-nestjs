import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './cqrs/commands/create-alarm.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './cqrs/queries/get-alarms.query';
import { GetAlarmsPgQuery } from './cqrs/queries/get-alarms-pg.query';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createAlarmCommand: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }

  findAllPg() {
    return this.queryBus.execute(new GetAlarmsPgQuery());
  }
}
