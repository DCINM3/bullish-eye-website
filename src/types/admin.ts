export type AdminRole = 'super_admin' | 'admin' | 'editor';

export type Permission = 
  | 'admin_management'   // Can manage other admins
  | 'blog_management'    // Can manage blog posts
  | 'contact_management' // Can manage contact submissions
  | 'product_management' // Can manage products
  | 'newsletter_management'; // Can manage newsletter subscriptions

export interface Admin {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  admin: {
    email: string;
    name: string;
    role: AdminRole;
  };
}

// Define role permissions
const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  super_admin: ['admin_management', 'blog_management', 'contact_management', 'product_management', 'newsletter_management'],
  admin: ['blog_management', 'contact_management', 'product_management', 'newsletter_management'],
  editor: ['blog_management']
};

/**
 * Check if a role has a specific permission
 * @param role The admin role to check
 * @param permission The permission to verify
 * @returns boolean indicating if the role has the permission
 */
export const hasPermission = (role: AdminRole | undefined, permission: Permission): boolean => {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
};