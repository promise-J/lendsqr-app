const USER_PATH = {
    '/user/': {
      post: {
        tags: ['User_Operation'],
        description: ' Create User',
        operationId: 'CreateUser',
        parameters: ['user_id', 'email', 'password', 'c_password'], // no parameter required
        requestBody: {
          // expected request body
          content: {
            // content-type
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'User Is created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
        }
      },
      delete: {
        tags: ['User_Operation'],
        description: ' Delete User',
        operationId: 'DeleteUser',
        parameters: [], // no parameter required
        requestBody: {
          // expected request body
          content: {
            // content-type
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'User Is Deleted',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
        }
      },
    },
    '/user/login': {
      post: {
        tags: ['User_Operation'],
        description: ' Login User',
        operationId: 'LoginUser',
        parameters: ['email', 'password'], // no parameter required
        requestBody: {
          // expected request body
          content: {
            // content-type
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'User Is created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
        }
      }
    }
  };
  
  export default USER_PATH;
  