\# Group A Logistics - Mobile App (Frontend)



React Native mobile application for Group A Logistics Management System with real-time tracking, order management, and fleet monitoring.



\## 🚀 Features



\- \*\*User Authentication\*\* - Secure login/registration with JWT

\- \*\*Dashboard\*\* - Real-time business metrics and KPIs

\- \*\*Order Management\*\* - Create, track, and manage orders

\- \*\*Fleet Tracking\*\* - Monitor vehicles and drivers in real-time

\- \*\*Shipment Tracking\*\* - Track shipments with live status updates

\- \*\*Route Management\*\* - Plan and optimize delivery routes

\- \*\*Customer Management\*\* - Complete customer database

\- \*\*Inventory Management\*\* - Stock tracking and management

\- \*\*Billing \& Invoices\*\* - Generate and manage invoices

\- \*\*Analytics\*\* - Business intelligence and reports

\- \*\*Real-time Chat\*\* - Team communication

\- \*\*Push Notifications\*\* - Instant alerts and updates

\- \*\*Attendance Tracking\*\* - Employee check-in/check-out

\- \*\*Offline Support\*\* - Works with limited connectivity



\## 📋 Prerequisites



\- Node.js (v16 or higher)

\- npm or yarn

\- Expo CLI

\- iOS Simulator (for Mac) or Android Studio (for Android development)

\- React Native development environment set up



\## ⚙️ Installation



\### 1. Clone the repository

```bash

git clone https://github.com/shiv48646/GroupALogistics-frontend.git

cd GroupALogistics-frontend

```



\### 2. Install dependencies

```bash

npm install

```



\### 3. Environment Setup

Create a `.env` file in the root directory:

```env

\# API Configuration

API\_BASE\_URL=http://localhost:5000/api/v1

SOCKET\_URL=http://localhost:5000



\# Firebase (for push notifications)

FIREBASE\_API\_KEY=your\_firebase\_api\_key

FIREBASE\_AUTH\_DOMAIN=your\_project.firebaseapp.com

FIREBASE\_PROJECT\_ID=your\_project\_id



\# Google Maps (optional)

GOOGLE\_MAPS\_API\_KEY=your\_google\_maps\_key



\# Environment

NODE\_ENV=development

```



\### 4. Run the application



\*\*Using Expo:\*\*

```bash

\# Start Expo development server

npm start



\# Or specific platform

npm run android  # For Android

npm run ios      # For iOS

npm run web      # For web browser

```



\*\*Using React Native CLI:\*\*

```bash

\# Android

npx react-native run-android



\# iOS (Mac only)

npx react-native run-ios

```



\## 📁 Project Structure

```

GroupALogistics-frontend/

├── app/                    # App router (if using Expo Router)

│   ├── (auth)/            # Authentication screens

│   ├── (drawer)/          # Drawer navigation screens

│   └── (tabs)/            # Tab navigation screens

├── components/            # Reusable components

│   ├── auth/             # Authentication components

│   ├── dashboard/        # Dashboard components

│   ├── fleet/            # Fleet management components

│   ├── forms/            # Form components

│   ├── orders/           # Order components

│   ├── ui/               # UI components (buttons, cards, etc.)

│   └── layout/           # Layout components

├── screens/              # Screen components

│   ├── analytics/        # Analytics screens

│   ├── attendance/       # Attendance screens

│   ├── billing/          # Billing screens

│   ├── customers/        # Customer screens

│   ├── dashboard/        # Dashboard screen

│   ├── fleet/            # Fleet screens

│   ├── inventory/        # Inventory screens

│   ├── orders/           # Order screens

│   ├── routes/           # Route screens

│   ├── settings/         # Settings screens

│   └── shipments/        # Shipment screens

├── navigation/           # Navigation configuration

│   ├── AppNavigator.js   # Main app navigator

│   ├── AuthNavigator.js  # Auth flow navigator

│   ├── DrawerNavigator.js # Drawer navigation

│   └── TabNavigator.js   # Bottom tab navigation

├── store/                # Redux store

│   ├── slices/           # Redux slices

│   └── index.js          # Store configuration

├── services/             # API services

│   ├── api/              # API clients

│   └── storage/          # Local storage

├── utils/                # Utility functions

├── styles/               # Global styles

├── hooks/                # Custom React hooks

├── config/               # Configuration files

├── assets/               # Images, fonts, etc.

├── .env                  # Environment variables

├── .env.example          # Environment template

├── App.js                # App entry point

├── app.json              # Expo configuration

└── package.json          # Dependencies

```



\## 🔧 Configuration



\### Backend Connection



Update the API base URL in `.env`:

```env

API\_BASE\_URL=https://your-backend-url.com/api/v1

```



Or directly in `config/api.js`:

```javascript

export const API\_BASE\_URL = \_\_DEV\_\_

&nbsp; ? 'http://localhost:5000/api/v1'  // Development

&nbsp; : 'https://your-production-url.com/api/v1';  // Production

```



\### Push Notifications



Configure Firebase in `firebaseConfig.js`:

```javascript

export const firebaseConfig = {

&nbsp; apiKey: "your-api-key",

&nbsp; authDomain: "your-auth-domain",

&nbsp; projectId: "your-project-id",

&nbsp; // ... other config

};

```



\## 📱 Screens



\### Authentication

\- \*\*Login Screen\*\* - User authentication

\- \*\*Register Screen\*\* - New user registration

\- \*\*Forgot Password\*\* - Password recovery



\### Main App

\- \*\*Dashboard\*\* - Overview of key metrics

\- \*\*Orders\*\* - Order list and management

\- \*\*Shipments\*\* - Shipment tracking

\- \*\*Fleet\*\* - Vehicle monitoring

\- \*\*Customers\*\* - Customer database

\- \*\*Routes\*\* - Route planning

\- \*\*Inventory\*\* - Stock management

\- \*\*Billing\*\* - Invoice management

\- \*\*Analytics\*\* - Reports and insights

\- \*\*Settings\*\* - App configuration

\- \*\*Profile\*\* - User profile management

\- \*\*Notifications\*\* - Push notifications

\- \*\*Chat\*\* - Team messaging

\- \*\*Attendance\*\* - Clock in/out



\## 🎨 Tech Stack



\### Core

\- \*\*React Native\*\* - Mobile framework

\- \*\*Expo\*\* - Development platform

\- \*\*TypeScript/JavaScript\*\* - Programming language



\### State Management

\- \*\*Redux Toolkit\*\* - State management

\- \*\*Redux Persist\*\* - State persistence



\### Navigation

\- \*\*React Navigation\*\* - Navigation library

\- \*\*Expo Router\*\* - File-based routing (optional)



\### UI Components

\- \*\*React Native Paper\*\* - Material Design components

\- \*\*React Native Elements\*\* - UI toolkit

\- \*\*Lucide React Native\*\* - Icons



\### Data Fetching

\- \*\*Axios\*\* - HTTP client

\- \*\*Socket.io Client\*\* - Real-time communication



\### Forms \& Validation

\- \*\*Formik\*\* - Form management

\- \*\*Yup\*\* - Schema validation



\### Maps \& Location

\- \*\*React Native Maps\*\* - Map integration

\- \*\*Expo Location\*\* - Location services



\### Storage

\- \*\*AsyncStorage\*\* - Local storage

\- \*\*Expo SecureStore\*\* - Secure storage



\### Other

\- \*\*React Native Reanimated\*\* - Animations

\- \*\*React Native Gesture Handler\*\* - Touch handling

\- \*\*Date-fns\*\* - Date utilities



\## 🔐 Authentication Flow

```javascript

// Login example

import { useDispatch } from 'react-redux';

import { login } from './store/slices/authSlice';



const handleLogin = async (email, password) => {

&nbsp; try {

&nbsp;   const result = await dispatch(login({ email, password }));

&nbsp;   // Navigate to dashboard on success

&nbsp; } catch (error) {

&nbsp;   // Handle error

&nbsp; }

};

```



\## 📊 State Management



The app uses Redux Toolkit for state management with the following slices:



\- \*\*authSlice\*\* - Authentication state

\- \*\*ordersSlice\*\* - Orders management

\- \*\*shipmentsSlice\*\* - Shipment tracking

\- \*\*fleetSlice\*\* - Fleet management

\- \*\*customersSlice\*\* - Customer data

\- \*\*inventorySlice\*\* - Inventory management

\- \*\*billingSlice\*\* - Billing and invoices

\- \*\*analyticsSlice\*\* - Analytics data

\- \*\*uiSlice\*\* - UI state (loading, modals, etc.)



\## 🧪 Testing

```bash

\# Run tests

npm test



\# Run tests with coverage

npm run test:coverage



\# Run tests in watch mode

npm run test:watch

```



\## 📦 Building for Production



\### Android

```bash

\# Build APK

npm run build:android



\# Build AAB (for Play Store)

eas build --platform android

```



\### iOS

```bash

\# Build IPA (Mac only)

npm run build:ios



\# Build with EAS

eas build --platform ios

```



\## 🚀 Deployment



\### Expo Publish

```bash

\# Publish to Expo

expo publish



\# Or with EAS Update

eas update --branch production

```



\### App Stores

1\. Build production version using EAS Build

2\. Submit to stores using EAS Submit:

```bash

eas submit --platform android

eas submit --platform ios

```



\## 🔄 Development Workflow

```bash

\# Start development server

npm start



\# Clear cache

npm start -- --clear



\# Run on specific device

npm run android -- --deviceId=<device-id>

npm run ios -- --simulator="iPhone 14"

```



\## 🐛 Debugging

```bash

\# Open React Native Debugger

npm run debugger



\# View logs

npx react-native log-android

npx react-native log-ios

```



\## 📝 Code Style



The project uses ESLint and Prettier:

```bash

\# Lint code

npm run lint



\# Fix linting issues

npm run lint:fix



\# Format code

npm run format

```



\## 🤝 Contributing



1\. Fork the repository

2\. Create your feature branch (`git checkout -b feature/amazing-feature`)

3\. Commit your changes (`git commit -m 'Add amazing feature'`)

4\. Push to the branch (`git push origin feature/amazing-feature`)

5\. Open a Pull Request



\## 🔗 Related Repositories



\- \*\*Backend API:\*\* \[GroupALogistics-backend](https://github.com/shiv48646/GroupALogistics-backend)



\## 📄 License



This project is licensed under the MIT License.



\## 👥 Support



For support, email support@groupalogistics.com



\## 🔄 Version



Current Version: 1.0.0



---



Built with ❤️ for Group A Logistics

