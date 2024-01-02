import { Injectable } from '@nestjs/common';
import { DivingClub } from '../@models/diving-club';
import { BaseService } from '../@core/base-service';
import { AddressesService } from '../addresses/addresses.service';
import { DivingClubPatchDto } from '../@model-dto/diving-club-patch-dto';
import { AddressPatchDto } from 'src/@model-dto/address-patch-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DivingClubEntity } from '../@datas/DivingClubEntity';
import { DataSource, Repository } from 'typeorm';
import { DivingClubDto } from 'src/@models/diving-club-dto';

@Injectable()
export class DivingClubsService extends BaseService<DivingClub> {
  constructor(
    @InjectRepository(DivingClubEntity)
    protected readonly repository: Repository<DivingClubEntity>,
    protected readonly dataSource: DataSource,
    private readonly addressService: AddressesService,
  ) {
    super(dataSource);
  }

  getDivingClubs(): Promise<DivingClub[]> {
    return this.repository.find();
  }

  getDivingClub(id: number): Promise<DivingClub> {
    return this.repository.findOneBy({ id });
  }

  async saveDivingClub(club: DivingClub): Promise<DivingClub> {
    let clubEntity = new DivingClubEntity();
    clubEntity = Object.keys(club).reduce(
      (prev, key) => this.mapPatchDivingClub(prev, key, club),
      clubEntity,
    );
    return this.saveEntity(clubEntity);
  }

  async patchDivingClub(club: DivingClubPatchDto): Promise<DivingClub> {
    let result: DivingClub = await this.getDivingClub(club.id);
    result.name = club.name ?? result.name;
    result = Object.keys(club).reduce(
      (prev: DivingClubEntity, key: string) =>
        this.mapPatchDivingClub(prev, key, club),
      result,
    );
    return result;
  }

  async deleteDivingClub(id: number): Promise<DivingClub> {
    const result = await this.getDivingClub(id);
    await this.repository.delete(id);
    return result;
  }
  private mapPatchDivingClub(
    prev: DivingClubEntity,
    key: string,
    club: DivingClubPatchDto,
  ): DivingClubEntity {
    if (club[key] instanceof AddressPatchDto) {
      prev[key] = this.addressService.mapAddress(club[key]);
    } else {
      prev[key] = club[key];
    }
    return prev;
  }
}
