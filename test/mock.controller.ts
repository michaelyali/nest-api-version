import { Controller, Get } from '@nestjs/common';
import { ApiVersion } from '../src';

@Controller()
export class MockController {
  @Get('test-1')
  public test1() {
    return { status: true };
  }

  @Get('test-2')
  @ApiVersion()
  public test2() {
    return { status: true };
  }

  @Get('test-3')
  @ApiVersion('v1')
  public test3() {
    return { status: true };
  }

  @Get('test-4')
  @ApiVersion('v1', 'v2')
  public test4() {
    return { status: true };
  }

  @Get('test-5')
  @ApiVersion('v2')
  public test5() {
    return { status: true };
  }
}
