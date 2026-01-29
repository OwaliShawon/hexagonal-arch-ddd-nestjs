import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            // We are going to hardcode the connection options for simplicity
            // but you can use a configuration file or environment variables
            TypeOrmModule.forRoot({
              name: 'alarms_write_db',
              type: 'postgres',
              host: 'localhost',
              port: 5435,
              password: 'pass123',
              username: 'postgres',
              database: 'alarms_write_db',
              autoLoadEntities: true,
              synchronize: true,
            }),
            TypeOrmModule.forRoot({
              name: 'alarms_read_db',
              type: 'postgres',
              host: 'localhost',
              port: 5435,
              password: 'pass123',
              username: 'postgres',
              database: 'alarms_read_db',
              autoLoadEntities: true,
              synchronize: true,
            }),
            MongooseModule.forRoot('mongodb://localhost:27035/vf-read-db'),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
