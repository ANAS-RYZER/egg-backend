import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validateAdminCredentials } from '../service/user.service';

const createToken = (payload: object) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/**
 * POST /api/admin/login
 * Body: { email: string, password: string }
 * Success: 200 { token, admin: { email } }
 * Failure: 400 or 401
 */
export const adminRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    } 

    const valid = validateAdminCredentials({ email, password });
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a simple token (you can add more claims if needed)
    const token = createToken({ role: 'admin', email });

    return res.status(200).json({
      message: 'Login successful',
      token,
      admin: { email },
    });
  } catch (err) {
    next(err);
  }
};
