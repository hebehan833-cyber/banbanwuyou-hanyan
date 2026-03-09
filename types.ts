
export type ScreenName = 'Landing' | 'Home' | 'ServiceDetail' | 'CitySelect' | 'Chat' | 'Booking' | 'PaymentConfirmation';

export interface Service {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  duration: string;
  description: string;
  icon: string;
  image: string;
}

export interface City {
  name: string;
  status: 'opened' | 'unopened';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
