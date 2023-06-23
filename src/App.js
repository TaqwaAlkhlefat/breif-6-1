import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/Home';
import ContractList from './components/ContractList';


function App() {
  return (
    <div className="App">
      <ChakraProvider>
        {/* <Home /> */}
        <ContractList />
      </ChakraProvider>
    </div>
  );
}

export default App;
