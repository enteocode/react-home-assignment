import { useCallback, useEffect, useRef, useState } from 'react';
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
    const handler = useRef<Handler | null>(null);

    const calculate: MessageSender = useCallback((file: File) => {
        handler.current?.calculate(file);
    }, []);

    useEffect(() => {
        const current = new Handler(setProgress);

        handler.current = current;

        return () => {
            current.abort();
            handler.current = null;
        };
    }, []);

    return [calculate, progress];
};
