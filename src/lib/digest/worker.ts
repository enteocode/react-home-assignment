import { sha256, Hasher } from 'js-sha256';

import type { Progress } from './progress.type';

/**
 * Accepts a File object from the main thread and processes its SHA256 hash in
 * a streamed process to maintain a low memory footprint
 *
 * @internal
 * @param event
 */
self.onmessage = async (event: MessageEvent<File>) => {
    const file: File = event.data;

    if (!file || typeof file.stream !== 'function') {
        self.postMessage({ error: 'Invalid file object' });
    }
    const reader = file.stream().getReader();
    const size = file.size;
    const name = file.name;
    const hash: Hasher = sha256.create();

    let processed: number = 0;

    try {
        while (processed < size) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }
            processed += value.length;
            hash.update(value);

            self.postMessage(<Progress>{
                done: false,
                hash: '',
                name,
                size,
                processed,
                error: ''
            });
        }
        self.postMessage(<Progress>{
            done: true,
            hash: hash.hex(),
            name,
            size,
            processed,
            error: ''
        });
    } catch (e) {
        self.postMessage(<Progress>{
            done: false,
            name,
            size,
            processed,
            error: e instanceof Error ? e.message : String(e)
        });
    } finally {
        reader.releaseLock();
    }
};

// Makes the file as a module and avoids global scope issues

export {};
