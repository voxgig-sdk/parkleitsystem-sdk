"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkleitsystemError = void 0;
class ParkleitsystemError extends Error {
    isParkleitsystemError = true;
    sdk = 'Parkleitsystem';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ParkleitsystemError = ParkleitsystemError;
//# sourceMappingURL=ParkleitsystemError.js.map