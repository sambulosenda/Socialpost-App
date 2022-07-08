import Amplify from 'aws-amplify';
import { MenuProvider } from 'react-native-popup-menu';
import Client from './src/apollo/Client';
import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
import Navigation from './src/navigation';

Amplify.configure(config);

const App = () => {
  return (
    <AuthContextProvider>
      <MenuProvider>
        <Client>
          <Navigation />
        </Client>
      </MenuProvider>
    </AuthContextProvider>
  );
};

export default App;
