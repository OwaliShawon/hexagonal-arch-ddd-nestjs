import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AlarmsModule } from './alarms/application/alarms.module';
import { AlarmsInfrastructureModule } from './alarms/infrastructure/alarms-infrastructure.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { CoreModule } from './core/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { winstonConfig } from './common/logger/winston-logger.config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        CqrsModule.forRoot(),
        WinstonModule.forRoot(winstonConfig),
        PrometheusModule.register({
          path: '/metrics',
          defaultMetrics: {
            enabled: true,
          },
        }),
        AlarmsModule.withInfrastucture(
          AlarmsInfrastructureModule.use(options.driver),
        ),
      ],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
