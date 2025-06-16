export interface ContactSubmission {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'not-viewed' | 'opened' | 'responded';
  submittedAt: Date;
  updatedAt: Date;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactSubmission;
}
