import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';
import { AlarmsCqrsModule } from './cqrs/alarms-cqrs.module';

/**
 * Alarms Module - Application Layer
 *
 * This module coordinates:
 * - HTTP Controllers for API endpoints
 * - Service layer using CQRS pattern
 * - CQRS implementation for commands/queries/events
 *
 * Must be used with .withInfrastucture() to provide persistence implementations
 */
@Module({})
export class AlarmsModule {
  /**
   * Registers the AlarmsModule with infrastructure persistence
   * @param infrastructureModule The infrastructure module providing repository implementations
   */
  static withInfrastucture(
    infrastructureModule: Type | DynamicModule,
  ): DynamicModule {
    return {
      module: AlarmsModule,
      imports: [AlarmsCqrsModule.withInfrastructure(infrastructureModule)],
      controllers: [AlarmsController],
      providers: [AlarmsService],
    };
  }
}
