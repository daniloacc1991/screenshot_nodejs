import { Body, Controller, Post } from '@nestjs/common';
import { AppDTO } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Post()
    async screenshot(@Body() body: AppDTO) {
        return await this.appService.screenshot(body);
    }
}