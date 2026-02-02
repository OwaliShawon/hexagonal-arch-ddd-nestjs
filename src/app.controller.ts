import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppService } from './app.service';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  private readonly loggerInstance = new Logger();

  @Get()
  getHello(): string {
    // this.logger.debug('AppController: getHello method invoked');
    // this.logger.verbose('AppController: Returning greeting message');
    // this.logger.log('AppController: Handling GET / request');
    // this.logger.warn('AppController: Ensure this endpoint is secured in production');
    // this.logger.error('AppController: No errors, just a demo log message');
    // this.logger.fatal('AppController: Fatal log for demonstration purposes');

    this.logger.log({
      level: 'info',
      message: 'AppController: getHello method invoked',
      route: '/',
      label: AppController.name,
    });
    this.logger.warn('AppController: getHello method invoked - warn level');
    this.logger.error('AppController: getHello method invoked - error level');

    // this.loggerInstance.log('info', 'AppController: getHello method invoked using Logger instance');

    return this.appService.getHello();
  }
}
