import { MaterializedAlarmItemEntity } from 'src/alarms/infrastructure/persistence/orm/entities/materialized-alarm-item.entity';
import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

export abstract class FindAlarmsPgRepository {
  abstract findAll(): Promise<MaterializedAlarmItemEntity[]>;
}
