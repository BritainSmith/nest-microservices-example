import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Ctx, EventPattern, MessagePattern, Payload, NatsContext } from '@nestjs/microservices';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getHello(): string {
    return this.reportsService.getHello();
  }

  // Test message pattern for TCP
  @MessagePattern({cmd:'sum'})
  accumulate(data: number[]): number {
    return (data || []).reduce((a,b) => a + b);
  }


  // Wild card subscriptions - returns original producer in context
  @MessagePattern('time.us.*')
  getDate(@Payload() data: number[], @Ctx() context: NatsContext){
    console.log(`Subject: ${ context.getSubject()}`);
    return new Date().toLocaleTimeString();
  }

  // Event patterns
  @EventPattern('report_created')
  async handleReportCreated( data: Record <string, unknown>) {
    // execute business logic here
    return 'Report Created Successfully!'
  }
}
