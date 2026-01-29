import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAlarmsPgQuery } from './get-alarms-pg.query';
import { FindAlarmsRepository } from '../../ports/find-alarms.repository';
import { AlarmReadModel } from '../../../domain/read-models/alarm.read-model';

@QueryHandler(GetAlarmsPgQuery)
export class GetAlarmsPgQueryHandler implements IQueryHandler<
  GetAlarmsPgQuery,
  AlarmReadModel[]
> {
  constructor(private readonly alarmRepository: FindAlarmsRepository) {}

  async execute(): Promise<AlarmReadModel[]> {
    return (this.alarmRepository as any).findAllPg();
  }
}
