export type Progress = {
    done: boolean,
    name: string;
    size: number;
    processed: number;
    hash?: string;
    error?: string;
}
