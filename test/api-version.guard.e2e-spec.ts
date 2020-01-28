import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MockController } from './mock.controller';
import { ApiVersionGuard } from '../src';

describe('ApiVersionGuard (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const fixture = await Test.createTestingModule({
      controllers: [MockController],
      providers: [{ provide: APP_GUARD, useClass: ApiVersionGuard }],
    }).compile();

    app = fixture.createNestApplication();
    app.setGlobalPrefix('v1');

    await app.init();
  });

  it('should return status 200', () => {
    return request(app.getHttpServer())
      .get('/v1/test-1')
      .expect(200)
      .then(({ body }) => {
        expect(body.status).toBe(true);
      });
  });

  it('should return status 200', () => {
    return request(app.getHttpServer())
      .get('/v1/test-2')
      .expect(200)
      .then(({ body }) => {
        expect(body.status).toBe(true);
      });
  });

  it('should return status 200', () => {
    return request(app.getHttpServer())
      .get('/v1/test-3')
      .expect(200)
      .then(({ body }) => {
        expect(body.status).toBe(true);
      });
  });

  it('should return status 200', () => {
    return request(app.getHttpServer())
      .get('/v1/test-4')
      .expect(200)
      .then(({ body }) => {
        expect(body.status).toBe(true);
      });
  });

  it('should return status 403 (Forbidden)', () => {
    return request(app.getHttpServer())
      .get('/v1/test-5')
      .expect(403);
  });
});
