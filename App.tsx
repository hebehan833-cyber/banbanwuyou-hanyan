
import React, { useState, useEffect } from 'react';
import { ScreenName, Service, City } from './types';
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import CitySelectScreen from './screens/CitySelectScreen';
import ChatScreen from './screens/ChatScreen';
import BookingScreen from './screens/BookingScreen';
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen';
import BottomNav from './components/BottomNav';
import LoginModal from './components/LoginModal';
import OTPModal from './components/OTPModal';
import PermissionModal from './components/PermissionModal';
import CityOpeningModal from './components/CityOpeningModal';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCity, setSelectedCity] = useState('上海市');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showCityOpeningModal, setShowCityOpeningModal] = useState(false);

  const navigateTo = (screen: ScreenName) => setCurrentScreen(screen);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    navigateTo('ServiceDetail');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowOTPModal(false);
    if (currentScreen === 'Landing') {
      setShowPermissionModal(true);
    }
  };

  const handlePermissionAllow = () => {
    setShowPermissionModal(false);
    navigateTo('Home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Landing':
        return <LandingScreen onLoginClick={() => setShowLoginModal(true)} />;
      case 'Home':
        return (
          <HomeScreen 
            selectedCity={selectedCity} 
            onCityClick={() => navigateTo('CitySelect')}
            onServiceClick={handleServiceClick}
            onSupportClick={() => navigateTo('Chat')}
          />
        );
      case 'ServiceDetail':
        return selectedService ? (
          <ServiceDetailScreen 
            service={selectedService} 
            onBack={() => navigateTo('Home')} 
            onBook={() => navigateTo('Booking')}
          />
        ) : null;
      case 'Booking':
        return selectedService ? (
          <BookingScreen 
            service={selectedService}
            selectedCity={selectedCity}
            onBack={() => navigateTo('ServiceDetail')}
            onCityChange={(city) => setSelectedCity(city)}
            onSuccess={() => navigateTo('PaymentConfirmation')}
          />
        ) : null;
      case 'PaymentConfirmation':
        return (
          <PaymentConfirmationScreen 
            onBack={() => navigateTo('Booking')}
            onPaymentComplete={() => {
              alert('支付成功！');
              navigateTo('Home');
            }}
          />
        );
      case 'CitySelect':
        return (
          <CitySelectScreen 
            currentCity={selectedCity} 
            onBack={() => navigateTo('Home')}
            onCitySelect={(city) => {
              setSelectedCity(city);
              navigateTo('Home');
            }}
            onApplyToOpen={() => setShowCityOpeningModal(true)}
          />
        );
      case 'Chat':
        return <ChatScreen onBack={() => navigateTo('Home')} />;
      default:
        return <LandingScreen onLoginClick={() => setShowLoginModal(true)} />;
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="relative flex flex-col w-full max-w-[480px] bg-white dark:bg-background-dark min-h-screen shadow-xl overflow-hidden">
        {renderScreen()}
        
        {['Home'].includes(currentScreen) && (
          <BottomNav currentScreen={currentScreen} onNav={navigateTo} />
        )}

        {/* 弹窗组件 */}
        {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)} 
            onAllow={() => {
                setShowLoginModal(false);
                setShowOTPModal(true);
            }} 
          />
        )}
        
        {showOTPModal && (
          <OTPModal 
            onClose={() => setShowOTPModal(false)} 
            onSuccess={handleLoginSuccess} 
          />
        )}

        {showPermissionModal && (
          <PermissionModal 
            onClose={() => setShowPermissionModal(false)}
            onAllow={handlePermissionAllow}
          />
        )}

        {showCityOpeningModal && (
          <CityOpeningModal 
            onClose={() => setShowCityOpeningModal(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
