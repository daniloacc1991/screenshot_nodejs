import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (POST)', () => {
        it('user.name should be an case-insensitive match for "john"', function (done) {
            request(app.getHttpServer())
                .post('/')
                .send({ url: 'http://www.google.com' })
                .set('Accept', 'application/json')
                .expect(200, {
                    image: expect.any(String)
                }, done);
        });
    })
});
