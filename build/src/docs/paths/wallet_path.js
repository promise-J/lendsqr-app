"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WALLET_PATH = {
    '/wallet': {
        get: {
            tags: ['Wallet_Operation'],
            description: 'Get a Wallet balance',
            operationId: 'get Wallet',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    schema: {
                        $ref: '#/components/schemas/Wallet/properties/user_id'
                    },
                    required: true,
                    description: 'A single wallet id'
                }
            ],
            responses: {
                200: {
                    description: 'wallet is obtained',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Wallet'
                            }
                        }
                    }
                },
            }
        },
    },
    '/wallet/fund': {
        put: {
            tags: ['Wallet_Operation'],
            description: ' Fund Wallet',
            operationId: 'FundWallet',
            parameters: [],
            requestBody: {
                // expected request body
                content: {
                    // content-type
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Wallet'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Wallet balance declared',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Wallet'
                            }
                        }
                    }
                },
            }
        }
    },
    '/wallet/withdraw': {
        put: {
            tags: ['Wallet_Operation'],
            description: ' Withdraw from Wallet',
            operationId: 'WithdrawWallet',
            parameters: [],
            requestBody: {
                // expected request body
                content: {
                    // content-type
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Wallet'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Amount is withdrawn',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Wallet'
                            }
                        }
                    }
                },
            }
        }
    },
    '/wallet/transfer/${id}': {
        put: {
            tags: ['Wallet_Operation'],
            description: ' Transfer from Wallet',
            operationId: 'TransferWallet',
            parameters: ['receiver_id'],
            requestBody: {
                // expected request body
                content: {
                    // content-type
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Wallet'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Amount is transfered',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Wallet'
                            }
                        }
                    }
                },
            }
        }
    },
};
exports.default = WALLET_PATH;
