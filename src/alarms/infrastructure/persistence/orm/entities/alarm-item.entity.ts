import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlarmEntity } from './alarm.entity';

@Entity('alarm_items')
export class AlarmItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => AlarmEntity, (alarm) => alarm.items)
  alarm: AlarmEntity;
}
