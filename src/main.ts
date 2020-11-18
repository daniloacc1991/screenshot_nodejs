import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cluster from 'cluster';
import * as os from 'os';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';

dotenv.config();

if (cluster.isMaster) {
    const cpuCount = os.cpus().length;

    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('online', worker => {
        Logger.log('Worker ' + worker.process.pid + ' is online.');
    });
    cluster.on('exit', ({ process }, code, signal) => {
        Logger.log('worker ' + process.pid + ' died.');
    });
} else {
    async function bootstrap() {
        process.setMaxListeners(0);

        const app = await NestFactory.create(AppModule);
        app.use(express.static(process.env.PATH_STATIC));

        app.useGlobalPipes(new ValidationPipe({
            transform: true,
            disableErrorMessages: false,
            skipMissingProperties: false,
            validationError: { target: true, value: true },
        }));

        await app.listen(process.env.PORT, process.env.HOST);
    }
    bootstrap();
}