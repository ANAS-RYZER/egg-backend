// service: purely checks credentials (business logic)
export interface AdminCredentials {
    email: string;
    password: string;
  }
  
  const ADMIN_EMAIL = 'admin@farm.com';
  const ADMIN_PASSWORD = 'admin@farmpass';
  
  export const validateAdminCredentials = (creds: AdminCredentials): boolean => {
    if (!creds || !creds.email || !creds.password) return false;
    return creds.email === ADMIN_EMAIL && creds.password === ADMIN_PASSWORD;
  };
  