import { ReflectMetadata } from '@nestjs/common';

export const ApiVersion = (...versions: string[]) =>
  ReflectMetadata('apiVersion', versions);
