import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivingClubsModule } from './diving-clubs/diving-clubs-module';
import { AddressEntity } from './@datas/AddressEntity';
import { DivingClubEntity } from './@datas/DivingClubEntity';
import { AddressesModule } from './addresses/addresses-module';
import { PersonsModule } from './persons/persons.module';
import { PersonEntity } from './@datas/PersonEntity';;
import { MonitorModule } from './monitor/monitor-module';
import { MonitorEntity } from './@datas/MonitorEntity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'divingclubs',
      entities: [AddressEntity, DivingClubEntity, PersonEntity, MonitorEntity],
      synchronize: true,
    }),
    DivingClubsModule,
    AddressesModule,
    PersonsModule,
    MonitorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
