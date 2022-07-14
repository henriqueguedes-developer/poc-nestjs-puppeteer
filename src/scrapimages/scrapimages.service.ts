import { Injectable } from '@nestjs/common';
import { SharpService } from 'nestjs-sharp';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Scrap } from './scrap.schema';
import { randomUUID as v4 } from 'crypto';
import puppeteer from 'puppeteer-extra'
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ScrapimagesService {
  @WebSocketServer()
  server;

  constructor(
    @InjectModel(Scrap.name) private scrapModel: Model<Scrap>,
    private sharpService: SharpService,
  ) { }

  @SubscribeMessage('message')
  async findAll(@MessageBody() message: string) {
    const url = message['data'];
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    page.on('response', async (response) => {

      const matches = /.*\.(jpg|png|gif)$/.exec(response.url());
      if (matches && (matches.length === 2)) {
        const extension = matches[1];
        const buffer = await response.buffer();

        const savePath = `/images/${v4()}.${extension}`;
        const directory = `./static/${savePath}`;
        await this.sharpService.edit(buffer).grayscale().toFile(directory);
        await this.scrapModel.create({
          domain: response.url(),
          url: savePath,
        });
        this.server.emit('message', { data: savePath })
      }
    });

    await page.goto(url, { waitUntil: 'networkidle2' }).catch(
      e => this.server.emit('message', { data: '1' }));


    await browser.close();
  }

}
