import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider, Frame, TopBar, Navigation } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {
  HomeFilledIcon,
  OrderFilledIcon,
  ProductFilledIcon,
  PersonFilledIcon,
  ContentFilledIcon,
  FinanceFilledIcon,
  ChartVerticalFilledIcon,
  TargetFilledIcon,
  DiscountFilledIcon,
  GlobeFilledIcon,
  ListMajor,
} from '@shopify/polaris-icons';

import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import ProductBrand from './ProductBrand';
import Campaigns from './pages/Campaigns';

function AppContent() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const location = useLocation();

  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive((mobileNavigationActive) => !mobileNavigationActive),
    [],
  );

  const logo = {
    width: 124,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
    contextualSaveBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
    url: '#',
    accessibilityLabel: 'Jaded Pixel',
  };

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: '/',
            label: 'Home',
            icon: HomeFilledIcon,
            selected: location.pathname === '/',
          },
          {
            url: '/orders',
            label: 'Orders',
            icon: OrderFilledIcon,
            selected: location.pathname === '/orders',
          },
          {
            url: '/products',
            label: 'Products',
            icon: ProductFilledIcon,
            selected: location.pathname.startsWith('/products'),
            subNavigationItems: [
              {
                url: '#',
                excludePaths: ['#'],
                disabled: false,
                label: 'Collections',
              },
            ],
          },
          {
            url: '/customers',
            label: 'Customers',
            icon: PersonFilledIcon,
          },
          {
            url: '/content',
            label: 'Content',
            icon: ContentFilledIcon,
          },
          {
            url: '/finance',
            label: 'Finance',
            icon: FinanceFilledIcon,
          },
          {
            url: '/analytics',
            label: 'Analytics',
            icon: ChartVerticalFilledIcon,
          },
          {
            url: '/marketing',
            label: 'Marketing',
            icon: TargetFilledIcon,
            selected: location.pathname.startsWith('/marketing') || location.pathname.startsWith('/sales-sheets'),
            subNavigationItems: [
              {
                url: '#',
                excludePaths: ['#'],
                disabled: false,
                label: 'Automations',
              },
            ],
          },
          {
            url: '/discounts',
            label: 'Discounts',
            icon: DiscountFilledIcon,
          },
          {
            url: '/campaigns',
            label: 'Campaigns',
            icon: ListMajor,
            selected: location.pathname === '/campaigns',
          },
        ]}
      />
      <Navigation.Section
        title="SALES CHANNELS"
        items={[
          {
            url: '/online-store',
            label: 'Online Store',
            icon: GlobeFilledIcon,
          },
          {
            url: '/collective',
            label: 'Collective (Supplier)',
            icon: ProductFilledIcon,
          },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/orders" element={<Page2 />} />
        <Route path="/products" element={<ProductBrand />} />
        <Route path="/customers" element={<Page3 />} />
        <Route path="/content" element={<Page4 />} />
        <Route path="/finance" element={<Page1 />} />
        <Route path="/analytics" element={<Page2 />} />
        <Route path="/marketing" element={<Page3 />} />
        <Route path="/discounts" element={<Page4 />} />
        <Route path="/online-store" element={<Page1 />} />
        <Route path="/collective" element={<Page2 />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Routes>
    </Frame>
  );
}

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
