import { HTTP_CODE } from './constants'

export class CustomError extends Error { 
  constructor(code: number, message?: string) {
    super(message); 
    this.code = code
    this.message = message || 'unknown error'
    this.getCodeMsg = () => {
      return {
        code: this.code,
        message: this.message
      }
    }
  }

  code: number
  getCodeMsg: Function
}

export class HttpError extends CustomError { 
  constructor(code: number, message?: string) {
    super(code, message); 
    if (Object.values(HTTP_CODE).indexOf(code) < 0) {
      throw Error('not an invalid http code')
    }
  }
}
