import { message } from 'antd';

export { DATE_FORMAT, FORM_MOCK } from './constants';

/**
 *
 * @param {Object} errorBE - error message from BE
 * @param {String} customError - error message from FE
 */
export function errHandler(errorBE = {}, customError = '') {
  const {
    response: {
      data: {
        message:
          errorMessageFromBE = 'Cannot connect to server, please check connection',
      } = {},
    } = {},
  } = errorBE || {};
  message.error(customError || errorMessageFromBE);
}
