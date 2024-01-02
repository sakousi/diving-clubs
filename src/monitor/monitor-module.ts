import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorEntity } from '../@datas/MonitorEntity';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { Module } from '@nestjs/common';
import { AddressesModule } from '../addresses/addresses-module';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [PersonsModule, TypeOrmModule.forFeature([MonitorEntity])],
  providers: [MonitorService],
  controllers: [MonitorController],
})
export class MonitorModule {}
