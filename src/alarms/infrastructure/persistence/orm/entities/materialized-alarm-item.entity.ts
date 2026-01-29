import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MaterializedAlarmViewEntity } from './materialized-alarm-view.entity';

@Entity()
export class MaterializedAlarmItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => MaterializedAlarmViewEntity, (alarm) => alarm.items)
  alarm: MaterializedAlarmViewEntity;
}
