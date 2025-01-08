export const environment = {
    production: false,
    baseUrl: 'http://localhost:5139/api/',
    keys: {
      accessToken: 'accessToken',
      authorization: 'Authorization',
    },
    errors: {
      messages: {
        general: 'ERRORS.GENERAL',
        unauthorizedAccess: 'ERRORS.UNAUTHORIZED_ACCESS',
        unauthorizedCall: 'ERRORS.UNAUTHORIZED_CALL',
        invalidForm: 'ERRORS.INVALID_FORM',
      },
      statuses: {
        unauthorize: 401,
        cors: 0,
      },
    },
  };
  