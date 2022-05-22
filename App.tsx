import Navigation from './src/navigation';
import Amplify, { photoPlaceholderIcon } from 'aws-amplify';
import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
import Client from './src/apollo/Client';

Amplify.configure(config);

const App = () => {
  return (
    <AuthContextProvider>
      <Client><Navigation /></Client>
      
    </AuthContextProvider>
  );
};

export default App;

