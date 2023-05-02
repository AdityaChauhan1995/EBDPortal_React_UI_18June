import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { store, persistor } from './redux/store';
import routes from './components/routes/routes';
import "semantic-ui-css/semantic.min.css";
import { PersistGate } from 'redux-persist/integration/react'
import './Index.css';

const provider = (
	<Provider store={store}>
		<div style={{width: 1050, minHeight: '100vh', padding: 5}}>
			<PersistGate loading={null} persistor={persistor}>
				{routes}
			</PersistGate>
		</div>
	</Provider>
);

ReactDOM.render(provider, document.getElementById('root'));
registerServiceWorker();
console.log('running with env:',process.env.REACT_APP_ENV)
