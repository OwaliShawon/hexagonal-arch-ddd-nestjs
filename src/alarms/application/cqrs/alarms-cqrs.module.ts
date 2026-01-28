import { Module, DynamicModule, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from './events/alarm-created.event-handler';

/**
 * CQRS Module for Alarms
 *
 * This module demonstrates the CQRS (Command Query Responsibility Segregation) pattern.
 * It separates:
 * - Commands: Write operations (CreateAlarm)
 * - Queries: Read operations (GetAlarms)
 * - Events: Domain events (AlarmCreated)
 *
 * Each has its own handler that executes the business logic.
 */
@Module({
  imports: [CqrsModule],
  providers: [
    // Domain Factory
    AlarmFactory,

    // Command Handlers (Write operations)
    CreateAlarmCommandHandler,

    // Query Handlers (Read operations)
    GetAlarmsQueryHandler,

    // Event Handlers (Side effects)
    AlarmCreatedEventHandler,
  ],
  exports: [
    // Export factory for use in other parts of the application
    AlarmFactory,
  ],
})
export class AlarmsCqrsModule {
  /**
   * Creates a dynamic module with infrastructure dependencies
   * This allows the CQRS module to work with any infrastructure implementation
   */
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsCqrsModule,
      imports: [CqrsModule, infrastructureModule],
      providers: [
        AlarmFactory,
        CreateAlarmCommandHandler,
        GetAlarmsQueryHandler,
        AlarmCreatedEventHandler,
      ],
      exports: [AlarmFactory],
    } as DynamicModule;
  }
}
