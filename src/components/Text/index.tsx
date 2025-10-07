import React, { FunctionComponent, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

import * as style from './style.scss';

export type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Text: FunctionComponent<Props> = ({ className, maxLength, value, ...props }) => {
    return (
        <div className={classNames(style.container, className)}>
            <textarea
                className={classNames(style.textarea, className)}
                value={value}
                maxLength={maxLength}

                {...props}
            />

            {maxLength && (
                <small className={style.info}>{value ? String(value).length : 0} / {maxLength}</small>
            )}
        </div>
    );
}

export default Text;
