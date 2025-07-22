import { Role } from '../constants/role';

declare global {
  namespace Express {
    interface Request {
      User?: {
        userid: any;
        id: string;
        role: Role; // ✅ Changed from string to Role type
      };
    }
  }
}

export {};
