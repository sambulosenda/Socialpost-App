import Navigation from './src/navigation';
import Amplify, { photoPlaceholderIcon } from 'aws-amplify';
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
  return <Navigation />;
};


export default App;
