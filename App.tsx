import Navigation from './src/navigation';
import Amplify, { photoPlaceholderIcon } from 'aws-amplify';
import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
import Client from './src/apollo/Client';
import { MenuProvider } from 'react-native-popup-menu';

Amplify.configure(config);

const App = () => {
  return (
    <AuthContextProvider>
        <MenuProvider>

      <Client><Navigation /></Client>
      </MenuProvider>

    </AuthContextProvider>
  );
};

export default App;

