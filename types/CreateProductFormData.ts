export type CreateProductFormData = {
  name: string;
  description: string;
  price: number;
  period: string;
  currency: string;
  has_quota: boolean;
  quota: number;
  has_trial: boolean;
  trial_length: number;
  trial_time_frame: Date;
};
