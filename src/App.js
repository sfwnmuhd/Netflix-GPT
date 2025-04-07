import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';


const AppLayout = () =>{
    return (
        <Provider store={appStore}>
            <Body />
        </Provider>
    )
} 



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppLayout />);