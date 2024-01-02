import { ApiProperty } from "@nestjs/swagger";
import { Monitor } from "src/@models/monitor";
import { PersonDto } from "./person-dto";

export class MonitorDto extends PersonDto implements Monitor {
  @ApiProperty()
  monitorNumber?: number;
  @ApiProperty()
  grade: string;
}