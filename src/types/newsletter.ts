export interface Newsletter {
  _id?: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
  source?: string; // Where the subscription came from (footer, popup, etc.)
}

export interface NewsletterSubscriptionResponse {
  success: boolean;
  message: string;
  data?: Newsletter;
}
