import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { AlarmEntity } from './entities/alarm.entity';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { AlarmItemEntity } from './entities/alarm-item.entity';
import { FindAlarmsRepository } from '../../../application/ports/find-alarms.repository';
import { OrmFindAlarmsRepository } from './repositories/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';
import { OrmUpsertMaterializedAlarmRepository } from './repositories/upsert-materialized-alarm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarm-view.schema';
import { MaterializedAlarmViewEntity } from './entities/materialized-alarm-view.entity';
import { MaterializedAlarmItemEntity } from './entities/materialized-alarm-item.entity';
import { PgUpsertMaterializedAlarmRepository } from './repositories/pg-upsert-materialized-alarm.repository';
import { PgUpsertMaterializedAlarmRepository as PgUpsertMaterializedAlarmRepositoryPort } from '../../../application/ports/pg-upsert-materialized-alarm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity], 'alarms_write_db'),
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity], 'alarms_read_db'),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useClass: OrmFindAlarmsRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
    {
      provide: PgUpsertMaterializedAlarmRepositoryPort,
      useClass: PgUpsertMaterializedAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
    PgUpsertMaterializedAlarmRepositoryPort,
  ],
})
export class OrmAlarmPersistenceModule {}
