import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import GlobalStyle from './GlobalStyle';

import store from './Store';
import MyHeroes from './components/MyHeroes/MyHeroes';

const theme = require('@rebass/preset').default;
console.log(theme);
function App(): JSX.Element {
	return (
		<Provider store={ store }>
			<ThemeProvider theme={ theme }>
				<GlobalStyle />
				<MyHeroes />
			</ThemeProvider>
		</Provider>
	);
}

export default App;
