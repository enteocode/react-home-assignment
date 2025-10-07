import React, { FunctionComponent, PropsWithChildren } from 'react';
import Icon, { Props as IconProps } from '../Icon';
import classNames from 'classnames';

import * as style from './style.scss';

export type Action = Omit<IconProps, 'size'>;

export type Props = PropsWithChildren<{
    className?: string;
    actions?: Action[];
}>;

const Toast: FunctionComponent<Props> = ({ className, actions, children }) => {
    return (
        <div className={classNames(style.container, className)}>
            <div className={style.toast}>
                {actions && (
                    <div className={style.actions}>
                        {actions.map(({ onClick, ...props }, i) => (
                            <button key={i} className={style.button} onClick={onClick}>
                                <Icon size={20} {...props} />
                            </button>
                        ))}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Toast;
