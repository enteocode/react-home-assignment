import React, { ChangeEventHandler, Fragment, FunctionComponent, MouseEventHandler, useState } from 'react';
import DropArea , { ErrorHandler, FileDetails } from './DropArea';
import Text from '../Text';
import Toast, { Action } from '../Toast';
import Details from './Details';
import { getFiltered } from '../../lib/helpers';
import { getFormattedSize } from '../../lib/size';
import { Source } from '../Icon';

import * as style from './style.scss';

const Application: FunctionComponent = () => {
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<FileDetails | null>(null);
    const [copied, setCopied] = useState<boolean>(false);

    const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        if (copied) {
            setCopied(false);
        }
        setDescription(e.target.value);
    };

    const handleError: ErrorHandler = (message: string) => {
        const next: Pick<FileDetails, 'error'> = {
            error: message
        };
        setFile(file ? { ...file, ... next } : next)
    }

    const handleCopyToClipboard: MouseEventHandler<HTMLElement> = (): void => {
        if (!file || !file.hash) {
            return;
        }
        const size = getFormattedSize(file.size);
        const data = getFiltered([`${file.name} (${size}) [${file.hash}]`, description]);
        const text = data.join('\r\n');

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
        });
    };

    const handleCloseClick: MouseEventHandler<HTMLElement> = (): void => {
        setFile(null);
    };

    return (
        <Fragment>
            {(file && (file.hash || file.error)) && (
                <Toast
                    actions={getFiltered<Action>([
                        file.hash && {
                            icon: copied ? Source.CLIPBOARD_WRITTEN : Source.CLIPBOARD,
                            onClick: handleCopyToClipboard
                        },
                        {
                            icon: Source.CLOSE,
                            onClick: handleCloseClick
                        }
                    ])}
                >
                    <Details
                        error={file.error}
                        file={file.name}
                        hash={file.hash}
                        size={file.size}
                        text={description}
                    />
                </Toast>
            )}

            <div className={style.layout}>
                <DropArea className={style.drop} onError={handleError} />

                <div className={style.text}>
                    <Text
                        value={description}
                        maxLength={500}
                        onChange={handleDescriptionChange}
                        placeholder="Description"
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default Application;
