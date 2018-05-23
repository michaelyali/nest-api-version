[![Build Status](https://travis-ci.org/zMotivat0r/nest-api-version.svg?branch=master)](https://travis-ci.org/zMotivat0r/nest-api-version)
[![GitHub license](https://img.shields.io/github/license/zMotivat0r/nest-api-version.svg)](https://github.com/zMotivat0r/nest-api-version/blob/master/LICENSE)

## Nest api version (global prefix) guard

`@nestjsx/api-verion` has been designed to quickly help you with the access logic if you're using `global prefix` in your application and want to restrict an access to different API endpoints with different API versions. For now it works with `Express` and `Fastify` adapters.

## Install

```bash
npm i @nestjsx/api-version --save
```

## Usage

#### 1. Enable `global prefix` in your bootstrap file

```typescript
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.setGlobalPrefix('v1'); // <-- here
  await app.listen(3000);
}
bootstrap();
```

#### 2. Connect `ApiVersionGuard` in app module

```typescript
import { ApiVersionGuard } from '@nestjsx/api-version';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiVersionGuard,
    },
  ],
})
export class ApplicationModule {}
```

#### 3. Use `ApiVersion` decorator in your controller

```typescript
import { ApiVersion } from '@nestjsx/api-version';
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  @ApiVersion()
  findAllV1() {
    return 'This action will work in all versions';
  }

  @Get()
  @ApiVersion('v1')
  findAllV1() {
    return 'This action will work in v1 version';
  }

  @Get()
  @ApiVersion('v2')
  findAllNext() {
    return 'This action will work in v2 version only';
  }
}
```

## Tests

```bash
npm run test:e2e
```

## License

MIT
