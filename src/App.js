import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body';


const AppLayout = () =>{
    return (
        <Body />
    )
} 



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppLayout />);