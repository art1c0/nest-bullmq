<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">Nest-Bullmq – NestJS wrapper for BullMQ</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
  <a href="https://github.com/nestjsplus/dyn-schematics" target="_blank">
    <img src="https://img.shields.io/badge/Built%20with-%40nestjsplus%2Fdyn--schematics-brightgreen" alt="Built with @nestjsplus/dyn-schematics">
  </a>
</div>

This dynamic module was generated with [Nest Dynamic Package Generator Schematics](https://github.com/nestjsplus/dyn-schematics).  You can read more about using the generator [here](https://github.com/nestjsplus/dyn-schematics).

### Installation

To install this generated project:

```bash
npm install nest-bullmq --save
```

(or yarn equivalent)

### Test

You can test this module against your Redis server (set in the .env file)

```bash
cd ./node_modules/nest-bullmq
npm run start:dev
```

Then connect to [http://localhost:3000](http://localhost:3000) and you should see the status of your BullMQ instance.

### Usage

```javascript
@Module({
  imports: [
    ConfigModule.forRoot(),

    NestBullmqModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          connection: ((url) => {
            if (!url) return {};
            url = new URL(url);
            return {
              host: url.hostname,
              port: parseInt(url.port),
              username: url.username,
              password: url.password,
            };
          })(configService.get('REDIS_URL')),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
```
Look at `src/nest-bullmq-client` for more details.

This wrapper is using [bullmq](https://www.npmjs.com/package/bullmq) module, so take a look how to use it.

```javascript
@Controller()
export class NestBullmqClientController {
  constructor(private readonly nestBullmqService: NestBullmqService) {}

  @Get()
  async index() {
    // create instances with options included:
    const flowProducer = this.nestBullmqService.create('FlowProducer')();
    // or create directly
    const Bullmq = this.nestBullmqService.getBullmq();
    const options = this.nestBullmqService.getOptions();
    return new Bullmq.FlowProducer(options);
  }
}
```

Good luck!
