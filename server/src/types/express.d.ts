import { Payload } from ".";

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}
