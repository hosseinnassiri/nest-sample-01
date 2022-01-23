import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { BearerStrategy } from 'passport-azure-ad';
import { AuthGuard } from '@nestjs/passport';


// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean | Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return this.validateRequest(request);
//   }

//   validateRequest(request: any): boolean | Promise<boolean> {
//     return false;
//   }
// }

const clientID = 'ae0a40a2-8e2e-4686-88af-c3fd20c59aa7';
const tenantID = '87ace4e9-c3ab-49ac-99f6-d02b494baf62';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
      clientID,
    });
  }
  
  async validate(data) {
    console.log(data);
    return data;
  }
}

// export const AzureADGuard = AuthGuard('azure-ad');