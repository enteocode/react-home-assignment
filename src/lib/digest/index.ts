import { useRef, useState } from 'react';
import { Handler } from './handler';

import type { MessageSender } from './handler';
import type { Progress } from './progress.type';

/**
 * Hook to manage digest calculator Worker and track its progress
 *
 * @public
 */
export const useDigestCalculator = (): [MessageSender, Progress | null] => {
    const [progress, setProgress] = useState<Progress | null>(null);
    const handler = useRef(new Handler(setProgress));

    return [
        handler.current.calculate,
        progress
    ];
};
