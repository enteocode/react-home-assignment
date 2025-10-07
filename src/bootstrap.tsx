import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Application from './components/Application';

import './index.scss';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <StrictMode>
        <Application/>
    </StrictMode>
);
