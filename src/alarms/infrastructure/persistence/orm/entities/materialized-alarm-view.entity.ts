import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MaterializedAlarmItemEntity } from './materialized-alarm-item.entity';

@Entity()
export class MaterializedAlarmViewEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;

  @Column()
  triggeredAt: Date;

  @Column()
  isAcknowledged: boolean;

  @OneToMany(() => MaterializedAlarmItemEntity, (item) => item.alarm, {
    cascade: true,
  })
  items: MaterializedAlarmItemEntity[];
}
