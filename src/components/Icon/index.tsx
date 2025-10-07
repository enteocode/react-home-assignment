import React, { FunctionComponent, MouseEventHandler } from 'react';
import Image from '../Image';
import classNames from 'classnames';

import clipboard from './icon.clipboard.svg';
import clipboardWritten from './icon.clipboard-written.svg';
import close from './icon.close.svg';

import * as style from './style.scss';

export enum Source {
    CLIPBOARD = clipboard,
    CLIPBOARD_WRITTEN = clipboardWritten,
    CLOSE = close
}

export type Props = {
    className?: string;
    icon: Source;
    size: number;
    hint?: string;
    onClick?: MouseEventHandler;
};

const Icon: FunctionComponent<Props> = ({ className, icon, size, hint, onClick }) => {
    return (
        <Image
            className={classNames(style.icon, className)}
            alt={hint}
            src={icon as unknown as string}
            width={size}
            height={size}
            onClick={onClick}
        />
    );
};

export default Icon;
