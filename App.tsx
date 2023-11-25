import React from 'react';
import store from './src/app/store';
import {Provider} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import Navigation from './src/navigation/navigation';

function App() {
  const stripePublishableKey =
    'pk_test_51HQwePHYJlX07yeu8qyXguNNmkTXIyZrCfArGkQvVLqtxgLQatNOv9ocivnp6CTKX33Z5WbqJD3qLS5sbBM8fJds009IKZwaui';
  return (
    <StripeProvider publishableKey={stripePublishableKey}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </StripeProvider>
  );
}

export default App;
