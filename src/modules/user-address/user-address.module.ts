import { Module } from '@nestjs/common';

import { UserAddressService } from './user-address.service';

@Module({
  providers: [UserAddressService],
})
export class UserAddressModule {}
