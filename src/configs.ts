const msal = require('@azure/msal-node');

export const configOld = {
  auth: {
    clientId: 'ae0a40a2-8e2e-4686-88af-c3fd20c59aa7',
    authority:
      'https://login.microsoftonline.com/87ace4e9-c3ab-49ac-99f6-d02b494baf62',
    clientSecret: 'SSd7Q~26GIASU~pgcSEt6e84K6wsr1ssyjv3c',
  },
  request: {
    authCodeUrlParameters: {
      scopes: ['user.read'],
      redirectUri: 'http://localhost:3000/redirect',
    },
    tokenRequest: {
      redirectUri: 'http://localhost:3000/redirect',
      scopes: ['user.read'],
    },
  },
  resourceApi: {
    endpoint: 'https://graph.microsoft.com/v1.0/me',
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

export const config = {
    creds: {
    // Requried
    identityMetadata: 'https://login.microsoftonline.com/87ace4e9-c3ab-49ac-99f6-d02b494baf62/v2.0/.well-known/openid-configuration',
    // 'https://login.microsoftonline.com/<your_tenant_name>.onmicrosoft.com/v2.0/.well-known/openid-configuration',
    // or 'https://login.microsoftonline.com/<your_tenant_guid>/v2.0/.well-known/openid-configuration'
    // or you can use the common endpoint
    // 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration'
    
    // Required
    clientID: 'ae0a40a2-8e2e-4686-88af-c3fd20c59aa7',
  
    // Required.
    // If you are using the common endpoint, you should either set `validateIssuer` to false, or provide a value for `issuer`.
    validateIssuer: false,
  
    // Required. 
    // Set to true if you use `function(req, token, done)` as the verify callback.
    // Set to false if you use `function(req, token)` as the verify callback.
    passReqToCallback: false,
  
    // Required if you are using common endpoint and setting `validateIssuer` to true.
    // For tenant-specific endpoint, this field is optional, we will use the issuer from the metadata by default.
    issuer: null,
  
    // Optional, default value is clientID
    audience: 'ae0a40a2-8e2e-4686-88af-c3fd20c59aa7',
  
    // Optional. Default value is false.
    // Set to true if you accept access_token whose `aud` claim contains multiple values.
    allowMultiAudiencesInToken: false,
  
    // Optional. 'error', 'warn' or 'info'
    loggingLevel:'info',

    scopes: ['access_as_user'],
  }
};