import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configOld, config } from './configs';
import { ConfidentialClientApplication } from '@azure/msal-node'
import { BearerStrategy, IBearerStrategyOption, IBearerStrategyOptionWithRequest, IOIDCStrategyOptionWithoutRequest, IOIDCStrategyOptionWithRequest, ITokenPayload, OIDCStrategy } from 'passport-azure-ad';
import * as passport from 'passport';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  //const cca = new ConfidentialClientApplication(config);

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  // const express = require('express');
  // const app = express();

  // app.get('/', (req, res) => {
  //   // get url to sign user in and consent to scopes needed for application
  //   cca.getAuthCodeUrl(config.request.authCodeUrlParameters).then((response) => {
  //       res.redirect(response);
  //     })
  //     .catch((error) => console.log(JSON.stringify(error)));
  // });

  // app.get('/redirect', (req, res) => {
  //   const tokenRequest = {
  //     ...config.request.tokenRequest,
  //     code: req.query.code,
  //   };

  //   cca.acquireTokenByCode(tokenRequest).then((response) => {
  //       console.log('\nResponse: \n:', response);
  //       res.sendStatus(200);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(500).send(error);
  //     });
  // });

  var options = {
    identityMetadata: config.creds.identityMetadata,
    clientID: config.creds.clientID,
    validateIssuer: config.creds.validateIssuer,
    issuer: config.creds.issuer,
    passReqToCallback: config.creds.passReqToCallback,
    allowMultiAudiencesInToken: config.creds.allowMultiAudiencesInToken,
    audience: config.creds.audience,
    scope: config.creds.scopes,
    loggingLevel: config.creds.loggingLevel,
    loggingNoPII: false,
  };

  var logger = new Logger();

  // var bearerStrategy = new BearerStrategy(options as IBearerStrategyOption,
  //   function(token: ITokenPayload, done) {
  //     done(null, token);
  //   }
  // );

  var oidcoptions = {
    identityMetadata: config.creds.identityMetadata,
    clientID: config.creds.clientID,
    validateIssuer: config.creds.validateIssuer,
    issuer: config.creds.issuer,
    passReqToCallback: config.creds.passReqToCallback,
    isB2C: false,
    //allowMultiAudiencesInToken: config.creds.allowMultiAudiencesInToken,
    //audience: config.creds.audience,
    loggingLevel: config.creds.loggingLevel,
    responseType: 'id_token',
    responseMode: 'query',
    clientSecret: 'SSd7Q~26GIASU~pgcSEt6e84K6wsr1ssyjv3c',
    redirectUrl: 'https://localhost:7177/'
  };

  var oidcStrategy = new OIDCStrategy(oidcoptions as IOIDCStrategyOptionWithRequest, 
    function(token, done) {
      if (!token.oid)
          done(new Error('oid is not found in token'));
      else {
          done(null, token);
      }
  });

  const optionsBearer: IBearerStrategyOptionWithRequest = {
    identityMetadata:
      'https://login.microsoftonline.com/87ace4e9-c3ab-49ac-99f6-d02b494baf62/v2.0/.well-known/openid-configuration',
    clientID: 'ae0a40a2-8e2e-4686-88af-c3fd20c59aa7',
    validateIssuer: false,
    loggingLevel: 'info',
    loggingNoPII: false,
    passReqToCallback: true,
    audience: null,
    issuer: null,
  };
  
  const bearerStrategy = new BearerStrategy(optionsBearer,
    function (req, token, done) {
      logger.debug(req);
      logger.debug(token);
  
      return done(null, { name: 'user name' }, token);
    });

  app.use(passport.initialize());
  passport.use(bearerStrategy);

  await app.listen(3000);
  // await app.init();
  // https.createServer(httpsOptions, server).listen(443);
}
bootstrap();
