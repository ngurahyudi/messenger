import { ApiResponseType } from '../../types/api-response.types';

export const apiResponseStub = (): ApiResponseType => {
  return {
    sender: { id: '5128998277120447' },
    recipient: { id: '101251929233504' },
    timestamp: '1651024438714',
    message: {
      mid: 'm_U9O6rXUCnLcTxRmD45Xnd_NRTgHRYbZ1eGAtQLPQT8Y-QRP5jtBHGcSPIgLZUnF3twlcHZZjM4kx_W_ktHkW6A',
      is_echo: true,
      text: 'What is your name?',
      app_id: 649974742968280,
    },
  };
};
