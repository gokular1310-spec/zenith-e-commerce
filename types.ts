import React from 'react';

export interface Review {
  id: number;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export type NewReview = Omit<Review, 'id' | 'date'>;

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  specs?: { [key: string]: string };
  offer?: string;
  reviews?: Review[];
  addedBy: string; // ID of admin or sub-admin
}

export type NewProduct = Omit<Product, 'id' | 'reviews'>;

export interface User {
  id: string;
  email: string;
  password_bcrypt: string;
  role: 'admin' | 'sub-admin' | 'customer';
  status: 'active' | 'blocked';
  mobile?: string;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: ShippingAddress;
  trackingNumber: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// New types for the conversation system
export interface Message {
  author: 'customer' | 'admin';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  customerEmail: string;
  subject: string;
  messages: Message[];
  status: 'open' | 'closed';
  lastUpdatedAt: string;
}

export interface AITopic {
  id: string;
  topic: string;
  enabled: boolean;
}


// Types for the new Block-Based Page Builder
export type ElementType = 'heading' | 'text' | 'button' | 'image' | 'spacer';

export type ElementStyles = React.CSSProperties;

export interface EditorElement {
  id: string;
  type: ElementType;
  content: string; // Text content, button label, or image src
  styles: ElementStyles;
}


// Updated types for the Page CMS
export interface Page {
  id: string;
  title: string;
  slug: string; // URL-friendly identifier
  content: EditorElement[]; // Content is now an array of structured elements
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export type NewPage = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>;
