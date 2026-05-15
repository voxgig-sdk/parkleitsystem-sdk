
import { Context } from './Context'


class ParkleitsystemError extends Error {

  isParkleitsystemError = true

  sdk = 'Parkleitsystem'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ParkleitsystemError
}

