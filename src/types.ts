/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info';
  icon?: string;
  position: 'left' | 'right';
}

export type ViewState = 'poster' | 'uploaded';

export type PaymentMethod = 'Bkash' | 'Nagad' | 'Rocket';

export interface PaymentMethodInfo {
  name: string;
  number: string;
  logo: string;
  color: string;
}

export interface AppSettings {
  paymentMethod: PaymentMethod;
  amount: string;
  senderNumber: string;
  isTimerActive: boolean;
  showLiveIntelligence: boolean;
  autoPayment: {
    enabled: boolean;
    intervalMinutes: number;
    methodPattern: 'alternating' | 'random';
  };
  paymentMethods: PaymentMethodInfo[];
  customPosterImage?: string;
}
