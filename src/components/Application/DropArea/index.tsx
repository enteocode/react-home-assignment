import React, {
    ChangeEventHandler,
    DragEventHandler,
    FunctionComponent,
    MouseEventHandler,
    memo,
    useEffect,
    useRef,
    useState
} from 'react';
import Button from '../../Button';
import Image, { Source } from '../../Image';
import Progress, { Props as ProgressProps } from '../../Progress';
import classNames from 'classnames';
import { useDigestCalculator } from '../../../lib/digest';

import * as style from './style.scss';

import type { Progress as ProgressType } from '../../../lib/digest/progress.type';

export type ErrorHandler = (message: string) => void;

export type ProgressStartHandler = () => void;

export type ProgressHandler = (progress: ProgressType) => void;

export type Props = {
    className?: string;
    onStart?: ProgressStartHandler;
    onProgress: ProgressHandler;
    onError: ErrorHandler;
};

/**
 * Translates the progress message to properties for Progress component
 *
 * @private
 * @param progress
 */
const getProgress = (progress: ProgressType | null): Pick<ProgressProps, 'total' | 'value'> => {
    if (!progress) {
        return {};
    }
    const { size, processed } = progress;

    if (size === processed) {
        return {};
    }
    return { total: size, value: processed };
};

const DropArea: FunctionComponent<Props> = ({ className, onError, onStart, onProgress }) => {
    const ref = useRef<HTMLInputElement>(null);

    const [calculate, progress] = useDigestCalculator();
    const [drag, setDrag] = useState(false);
    const [file, setFile] = useState('');
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleFileSelectionClick: MouseEventHandler<HTMLElement> = (e) => {
        if (!ref.current) {
            return;
        }
        ref.current.click();
    };

    const handleFileSelection: ChangeEventHandler<HTMLInputElement> = ({ target: { files, value } }) => {
        // IMPORTANT
        //
        // We have to control the value of the file input as well, otherwise we
        // couldn't reset on success and selecting the same file again won't
        // trigger the change event

        if (!files || files.length === 0) {
            return;
        }
        calculate(files[0]);
        setFile(value);
        setDisabled(true);
    };

    const handleDragOver: DragEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();

        if (drag || disabled) {
            return;
        }
        setDrag(true);
    };

    const handleDragLeave: DragEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();

        if (drag) {
            setDrag(false);
        }
    };

    const handleDrop: DragEventHandler<HTMLInputElement> = (e): void => {
        e.preventDefault();

        if (disabled) {
            return;
        }
        if (onStart) {
            onStart();
        }
        const { files } = e.dataTransfer;

        if (!files || files.length === 0) {
            onError('Use files only');
        }
        if (files.length > 1) {
            onError('Use single file only');
        }
        calculate(files[0]);
    };

    // ATTENTION
    //
    // The handlers must have a consistent reference between
    // different renders to avoid infinite loop

    useEffect(() => {
        if (!progress) {
            return;
        }
        if (progress.error) {
            setDisabled(false);
            return void onError(progress.error);
        }
        if (progress.hash) {
            setDisabled(false);
            setFile('');
        }
        onProgress(progress);
    }, [
        progress,
        onError,
        onProgress
    ]);

    return (
        <div
            className={classNames(style.container, drag && style.drag, className)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <input
                ref={ref}
                className={style.input}
                type="file"
                value={file}
                onChange={handleFileSelection}
            />

            <div className={style.wrapper}>
                <Image className={style.icon} src={Source.FILE as unknown as string} width={96} height={96} />

                <h1 className={style.title}>
                    SHA-256 Digest Calculator
                </h1>
                <Progress className={style.progress} {...getProgress(progress)} />

                <p className={style.description}>
                    Click the button or drop a file to the blue area to calculate its SHA-256 hash.
                </p>
            </div>

            <div className={style.actions}>
                <Button className={style.button} disabled={disabled} onClick={handleFileSelectionClick}>
                    Select file
                </Button>
            </div>
        </div>
    );
};

export default memo(DropArea);
