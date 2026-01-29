import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindAlarmsRepository } from '../../../../application/ports/find-alarms.repository';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-model';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterializedAlarmViewEntity } from '../entities/materialized-alarm-view.entity';

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
    @InjectRepository(AlarmEntity, 'alarms_read_db')
    private readonly pgAlarmRepository: Repository<AlarmEntity>,
  ) {}

  async findAll(): Promise<AlarmReadModel[]> {
    return this.alarmModel.find().lean();
  }

  async findAllPg(): Promise<AlarmReadModel[]> {
    const alarms = await this.pgAlarmRepository.find({
      relations: ['items'],
    });

    return alarms.map((alarm) => ({
      id: alarm.id,
      name: alarm.name,
      severity: alarm.severity,
      triggeredAt: alarm.triggeredAt,
      isAcknowledged: alarm.isAcknowledged,
      items: alarm.items.map((item) => ({
        name: item.name,
        type: item.type,
      })),
    }));
  }
}
