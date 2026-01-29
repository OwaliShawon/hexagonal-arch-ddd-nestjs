import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

export abstract class PgUpsertMaterializedAlarmRepository {
  abstract upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void>;
}
