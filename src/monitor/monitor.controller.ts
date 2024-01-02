import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { ApiTags } from '@nestjs/swagger';
import { MonitorDto } from 'src/@model-dto/monitor-dto';

@ApiTags('monitors')
@Controller('monitor')
export class MonitorController {
    constructor(private readonly service: MonitorService) {}

    @Get('/')
    async getMonitors(@Res() res) {
        const result = await this.service.getMonitors();
        return res.status(HttpStatus.OK).json(result);
    }

    @Get('/:id')
    async getMonitor(@Res() res, @Param('id', ParseIntPipe) id: number) {
        const result = await this.service.getMonitor(id);
        if (!result) {
            throw new NotFoundException('Monitor does not exist!');
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('/')
    async create(@Res() res, @Body() createItem: MonitorDto) {
        const newItem = await this.service.saveMonitor(createItem);
        return res.status(HttpStatus.OK).json({
            message: 'Monitor has been submitted successfully!',
            item: newItem,
        });
    }
}
