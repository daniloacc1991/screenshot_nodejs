import * as expressCluster from 'express-cluster';
import * as puppeteer from 'puppeteer';
import * as os from 'os';
import * as express from 'express';
import { v4 as uuidv4 } from 'uuid'


async function main() {
    await expressCluster(async (worker) => {
        process.setMaxListeners(0);

        const host = '172.16.0.21';
        const port = 8080;
        const app = express();
        let numReq = 0;
        await app.get('/', async (req, res) => {
            numReq++;
            console.log(`Worker ${worker.id}, request number ${numReq}`);
            res.send(`request number ${numReq}`);
            const broswer = await puppeteer.launch();
            const page = await broswer.newPage();
            await page.goto('https://www.google.com');
            await page.screenshot({ path: `C:\\screeenshot\\google_${uuidv4()}.jpg`, quality: 50, type: "jpeg" });
        });

        return app.listen(port, host, () => {
            console.log(`App ready at http://${host}:${port} in Worker ${worker.process.pid}`);
        })
    }, { count: os.cpus.length })
}

main();

