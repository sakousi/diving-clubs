import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/@core/base-service';
import { MonitorEntity } from 'src/@datas/MonitorEntity';
import { PersonEntity } from 'src/@datas/PersonEntity';
import { MonitorDto } from 'src/@model-dto/monitor-dto';
import { PersonsService } from 'src/persons/persons.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MonitorService extends BaseService<MonitorEntity> {
    constructor(
        @InjectRepository(MonitorEntity)
        protected readonly repository: Repository<MonitorEntity>,
        protected readonly dataSource: DataSource,
        protected readonly personService: PersonsService,
    ) {
        super(dataSource);
    }

    async getMonitors(): Promise<MonitorDto[]> {
        return this.entitiesToDto(...(await this.repository.find()));
    }

    async getMonitor(id: number): Promise<MonitorDto> {
        return this.entitiesToDto(await this.repository.findOneBy({ id }))?.[0];
    }

    async saveMonitor(monitor: MonitorDto): Promise<MonitorDto> {
        const person = await this.personService.savePerson(monitor) as PersonEntity;
        const monitorEntity = new MonitorEntity();
        monitorEntity.person = person;
        monitorEntity.grade = monitor.grade;
        monitorEntity.id = monitor.monitorNumber;
        const result = await  this.saveEntity(monitorEntity);
        return this.getMonitor(result.id);
    }

    private entitiesToDto(...entities: MonitorEntity[]): MonitorDto[] {
        return entities.map((entity) => ({
            ...entity.person,
            monitorNumber: entity.id,
            grade: entity.grade,
        }));
    }
}
