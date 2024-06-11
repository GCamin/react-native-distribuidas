import React from 'react';
import AppNavigator from '../navigation/Navigation';
import { Provider } from 'react-redux';
import {store} from '../redux/Store';

const App: React.FC = () => (
  <Provider store={store}>
    <AppNavigator/>
  </Provider>
    
);

export default App;

