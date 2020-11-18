import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import { AppDTO } from './app.dto';

@Injectable()
export class AppService {
    async screenshot(body: AppDTO) {
        const broswer = await puppeteer.launch();
        const page = await broswer.newPage();
        await page.goto(body.url);
        await page.screenshot({ path: `C:\\screeenshot\\screenshot_${uuidv4()}.jpg`, quality: 50, type: "jpeg" });
        await broswer.close();
        return { image: `screenshot_${uuidv4()}.jpg` };
    }
}
