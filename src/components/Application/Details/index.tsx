import React, { FunctionComponent, Fragment } from 'react';
import { getFormattedSize } from '../../../lib/size';
import classNames from 'classnames';

import * as style from './style.scss';

export type Props = {
    error?: string;
    hash?: string;
    file?: string;
    size?: number;
    text?: string;
};

const Details: FunctionComponent<Props> = ({ hash, file, size, text, error }) => {
    return (
        <dl className={style.list}>
            {file && (
                <Fragment>
                    <dt className={style.term}>File name</dt>
                    <dd className={style.description}>{file}</dd>
                </Fragment>
            )}
            {size && (
                <Fragment>
                    <dt className={style.term}>File size</dt>
                    <dd className={style.description}>{getFormattedSize(size)}</dd>
                </Fragment>
            )}
            {error && (
                <Fragment>
                    <dt className={style.term}>Error</dt>
                    <dd className={classNames(style.description, style.error)}>{error}</dd>
                </Fragment>
            )}
            {hash && (
                <Fragment>
                    <dt className={style.term}>Digest (SHA-256)</dt>
                    <dd className={classNames(style.description, style.hash)}>{hash}</dd>
                </Fragment>
            )}
            {text && (
                <Fragment>
                    <dt className={style.term}>File description</dt>
                    <dd className={style.description}>{text}</dd>
                </Fragment>
            )}
        </dl>
    );
};

export default Details;
