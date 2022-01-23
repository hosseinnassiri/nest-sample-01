import { Controller, Get, Req, Res, Query, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { configOld } from './configs';
import { ConfidentialClientApplication } from '@azure/msal-node'
// import { AuthGuard } from './auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
//@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseGuards(AuthGuard('azure-ad'))
  @UseGuards(AuthGuard('oauth-bearer'))
  getHello() {
    return this.appService.getHello();
  }

  // @Get()
  // getHello(@Res() response: Response) {
  //   const cca = new ConfidentialClientApplication(config);

  //   cca.getAuthCodeUrl(config.request.authCodeUrlParameters).then((res) => {
  //       response.redirect(res);
  //     })
  //     .catch((error) => console.log(JSON.stringify(error)));
  // }

  @Get("redirect")
  getRedirect(@Req() request: Request, @Res() response: Response, @Query('code') code: string) {
    const cca = new ConfidentialClientApplication(configOld);
    
    const tokenRequest = {
      ...configOld.request.tokenRequest,
      code: code
    };

    cca.acquireTokenByCode(tokenRequest).then((res) => {
        console.log('\nResponse: \n:', res);
        return {statusCode: 200, username: res.account.name, code: code}
      })
      .catch((error) => {
        console.log(error);
        return {statusCode: 401}
      });
  }
}
