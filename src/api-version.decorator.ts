import { SetMetadata } from '@nestjs/common';

export const ApiVersion = (...versions: string[]) =>
  SetMetadata('apiVersion', versions);
