interface UserDoc {
  NIC: string;
  id: number;
  role: string;
}

// @ts-ignore
declare global {
  namespace Express {
    interface Request {
      user?: UserDoc;
    }
  }
}
