import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

const theme = extendTheme({
  fonts: {
    heading: 'Poppins, sans-serif',
    body:    'Poppins, sans-serif',
  },
  colors: {
    coral:   '#FF6B6B',
    teal:    '#4ECDC4',
    sunset:  '#FF9F1C',
    ocean:   '#1A535C',
    sand:    '#FFE66D',
  },
  styles: {
    global: {
      body: {
        bg: 'ocean.50',
        color: 'gray.800',
        lineHeight: 'tall',
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
