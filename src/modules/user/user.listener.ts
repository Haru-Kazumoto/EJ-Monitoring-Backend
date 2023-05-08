import { Injectable } from '@nestjs/common';

import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { PasswordHashing } from 'src/shared/helpers/password.hasher';

@Injectable()
export class UserListener {

  static async onCreated(params, next) {
    // Check incoming query type
    if (params.model == 'User') {
      if (params.action === 'create' || params.action === 'update') {
        const password = params.args['data'].password;

        const encryptedPass = await PasswordHashing.hash(password);

        params.args['data'] = {
          ...params.args['data'],
          password: encryptedPass,
        };
      }
    }

    return next(params);
  }
}
