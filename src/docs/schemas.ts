const COMPONENTS = {
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['password', 'email'],
          properties: {
            id: {
              type: 'integer <primary key>',
              description: 'The auto-incrementing id of the User',
              example: '1'
            },
            user_id: {
              type: 'string <primary key>',
              description: 'a unique id of the user',
              example: '6302a6e6bf8a7894ccd1ecc2'
            },
            email: {
              type: 'string',
              description: 'An email on registration',
              example: 'ikeja@gmail.com'
            },
            password: {
              type: 'string',
              description: 'A unique password of the user',
              example: 'paswoe35'
            },
            createdAt: {
              type: 'date',
              description: 'The auto-generated Date this entry was created',
              example: '2022-07-25'
            },
            updatedAt: {
              type: 'date',
              description: 'The auto-generated Date this entry was updated',
              example: '2022-08-20'
            }
          },
          example: {
            id: 1,
            user_id: '2348143897228-ejjkjfke-ij4585',
            email: 'ikeja@gmail.com',
            password: 'pass35ef3',
            createdAt: '2022-07-25',
            updatedAt: '2022-08-20'
          }
        },
        Wallet: {
          type: 'object',
          required: [],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-incremented value of the wallet',
              example: 1
            },
            wallet_id: {
              type: 'string <primary key>',
              description: 'a string for the wallet id',
              example: '6302a6e6bf8a7894ccd1ecc2-ejkjk-3tejk'
            },
            balance: {
              type: 'integer',
              description: 'The balance in the user account',
              example: 0
            },
            user_id: {
              type: 'string',
              description: 'A reference to a User.',
              example:
                '6302a6e6bf8a7894ccd1ecc2-ejkjk-3tejk'
            },
            createdAt: {
              type: 'date',
              description: 'The auto-generated Date this entry was created',
              example: '2022-07-25'
            },
            updatedAt: {
              type: 'date',
              description: 'The auto-generated Date this entry was updated',
              example: '2022-08-20'
            }
          },
          example: {
            id: 1,
            wallet_id: '6302a6e6bf8a7894ccd1ecc2-ejkjk-3tejk',
            balance: 0,
            user_id: '6302a6e6bf8a7894ccd1ecc2-ejkjk-3tejk',
            createdAt: '2022-07-25',
            updatedAt: '2022-08-20'
          }
        }
      }
    }
  };
  
  export default COMPONENTS;
  