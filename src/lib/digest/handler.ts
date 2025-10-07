import type { Dispatch, SetStateAction } from 'react';
import type { Progress } from './progress.type';

export type MessageSetter = Dispatch<SetStateAction<Progress | null>>;
export type MessageSender = (file: File) => void;

/**
 * Handles the communication with the Worker
 *
 * We need mutable instances in order to manage the process, which should
 * be fit in React's immutable framework
 *
 * @internal
 */
export class Handler {
    private readonly worker: Worker;

    public constructor(set: MessageSetter) {
        const worker = new Worker(/* webpackChunkName: "digest.worker" */ new URL('./worker.ts', import.meta.url));

        worker.addEventListener('message', (event: MessageEvent<Progress>) => {
            set(event.data);
        });

        this.worker = worker;
    }

    public calculate: MessageSender = (file: File): void => {
        this.worker.postMessage(file);
    };
}
