import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ReferenceModule } from './references/reference.module';

const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/sample01';

@Module({
  imports: [
    //MongooseModule.forRoot(mongoConnection),
    //ReferenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
