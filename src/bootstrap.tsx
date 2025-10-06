import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <StrictMode>
        <h1>Hello World</h1>
    </StrictMode>
);
