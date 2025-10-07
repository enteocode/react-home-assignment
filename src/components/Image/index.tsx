import React, { FunctionComponent, ImgHTMLAttributes } from 'react';
import classNames from 'classnames';

import file from './icon.file.svg';

import * as style from './style.scss';

export enum Source {
    FILE = file
}

export enum LoadingType {
    EAGER = 'eager',
    LAZY = 'lazy'
}

export type Props = ImgHTMLAttributes<HTMLImageElement> & {
    className?: string;
    alt?: string;
    src: Source | string;
    width?: number;
    height?: number;
    loading?: LoadingType;
};

const Image: FunctionComponent<Props> = ({ className, alt, src, title, loading = LoadingType.LAZY, ...props }) => {
    return (
        <img
            className={classNames(style.image, className)}
            loading={loading}
            alt={alt}
            src={src as string}
            title={title || alt}

            {...props}
        />
    );
};

export default Image;
