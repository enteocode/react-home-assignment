import React, {
    ChangeEventHandler,
    DragEventHandler,
    FunctionComponent,
    MouseEventHandler,
    useRef,
    useState
} from 'react';
import Button from '../../Button';
import Image, { Source } from '../../Image';
import Progress from '../../Progress';
import classNames from 'classnames';

import * as style from './style.scss';

export type Props = {
    className?: string;
    onError?: ErrorHandler;
};

export type ErrorHandler = (message: string) => void;

export type FileDetails = Partial<{
    name: string;
    size: number
    hash: string;
    error: string
}>;

const DropArea: FunctionComponent<Props> = ({ className, onError }) => {
    const ref = useRef<HTMLInputElement>(null);

    const [drag, setDrag] = useState(false);

    const handleFileSelectionClick: MouseEventHandler<HTMLElement> = (e) => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const handleFileSelection: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.files);
    };

    const handleDragOver: DragEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();

        if (drag) {
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

        const { files } = e.dataTransfer;

        console.log(files);
        if (!onError) {
            return;
        }
        if (!files || files.length === 0) {
            onError('Use files only');
        }
        if (files.length > 1) {
            onError('Use single file only');
        }
    };

    return (
        <div
            className={classNames(style.container, drag && style.drag, className)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <input ref={ref} className={style.input} type="file" onChange={handleFileSelection} />

            <div className={style.wrapper}>
                <Image className={style.icon} src={Source.FILE as unknown as string} width={96} height={96} />

                <h1 className={style.title}>SHA-256 Digest Calculator</h1>

                <Progress
                    className={style.progress}
                    total={100}
                    value={25}
                />
                <p className={style.description}>
                    Click the button or drop a file to the blue area to calculate its SHA-256 hash.
                </p>
            </div>

            <div className={style.actions}>
                <Button className={style.button} onClick={handleFileSelectionClick}>
                    Select file
                </Button>
            </div>
        </div>
    );
};

export default DropArea;
