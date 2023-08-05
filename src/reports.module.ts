import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'REPORTS_SERVICE', transport: Transport.TCP}
    ])
  ],
  controllers: [ReportsController],
  providers: [
    {
    provide: 'REPORTS_SERVICE',
    useFactory: (configService: ConfigService) => {
      const reportSvcOptions = configService.getReportSvcOptions();
      return ClientProxyFactory.create(reportSvcOptions);
    },
    inject: [ConfigService]
    },
  ]
})
export class ReportsModule {}
