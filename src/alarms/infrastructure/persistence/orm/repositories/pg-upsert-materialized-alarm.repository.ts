import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-model';
import { MaterializedAlarmViewEntity } from '../entities/materialized-alarm-view.entity';
import { MaterializedAlarmItemEntity } from '../entities/materialized-alarm-item.entity';
import { PgUpsertMaterializedAlarmRepository as PgUpsertMaterializedAlarmRepositoryPort } from '../../../../application/ports/pg-upsert-materialized-alarm.repository';
import { AlarmItemEntity } from '../entities/alarm-item.entity';
import { AlarmEntity } from '../entities/alarm.entity';

@Injectable()
export class PgUpsertMaterializedAlarmRepository extends PgUpsertMaterializedAlarmRepositoryPort {
  constructor(
    @InjectRepository(AlarmEntity, 'alarms_read_db')
    private readonly alarmRepository: Repository<AlarmEntity>,
    @InjectRepository(AlarmItemEntity, 'alarms_read_db')
    private readonly alarmItemRepository: Repository<AlarmItemEntity>,
  ) {
    super();
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    // Remove existing alarm items if the alarm already exists
    await this.alarmItemRepository.delete({ alarm: { id: alarm.id } });

    // Upsert the alarm view
    await this.alarmRepository.upsert(
      {
        id: alarm.id,
        name: alarm.name,
        severity: alarm.severity,
        triggeredAt: alarm.triggeredAt,
        isAcknowledged: alarm.isAcknowledged,
      },
      ['id'],
    );

    // Insert new alarm items if they exist
    if (alarm.items && alarm.items.length > 0) {
      const items = alarm.items.map((item) => ({
        name: item.name,
        type: item.type,
        alarm: { id: alarm.id },
      }));

      await this.alarmItemRepository.insert(items);
    }
  }
}
