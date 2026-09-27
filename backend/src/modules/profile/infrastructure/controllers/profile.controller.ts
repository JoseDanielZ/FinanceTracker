import { Body, Controller, Get, Put } from '@nestjs/common';
import { GetProfileUseCase } from '../../application/use-cases/get-profile.use-case';
import { UpdateProfileUseCase } from '../../application/use-cases/update-profile.use-case';
import { UpdateProfileDto } from '../../application/dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly getProfile: GetProfileUseCase,
    private readonly updateProfile: UpdateProfileUseCase,
  ) {}

  @Get()
  get() {
    return this.getProfile.execute();
  }

  @Put()
  update(@Body() dto: UpdateProfileDto) {
    return this.updateProfile.execute(dto);
  }
}
