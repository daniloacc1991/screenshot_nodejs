import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('', () => {
    const result = { image: expect.any(String) }
    it('should return the url of the screenshot', async () => {
      expect(await appController.screenshot({ url: 'http:www.google.com' })).toStrictEqual(result);
    });
  });
  
});
