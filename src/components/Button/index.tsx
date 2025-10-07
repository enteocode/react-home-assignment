import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import * as style from './style.scss';

export type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FunctionComponent<Props> = ({ className, children, disabled, ...props }) => {
    return (
        <button
            className={classNames(style.button, disabled && style.disabled, className)}
            disabled={disabled}

            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
