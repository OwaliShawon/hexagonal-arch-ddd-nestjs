import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsResolver } from './alarms/alarms.resolver';
import { AlarmsModule } from './alarms/alarms.module';

@Module({
  imports: [AlarmsModule],
  controllers: [AppController],
  providers: [AppService, AlarmsResolver],
})
export class AppModule {}
