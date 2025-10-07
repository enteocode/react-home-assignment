import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import * as style from './style.scss';

export type Props = {
    className?: string;
    total?: number;
    value?: number;
}

const Progress: FunctionComponent<Props> = ({ className, total, value }) => {
    const ratio = total && value ? (100 - Math.floor(value / total * 100)) * -1 : -100;

    return (
        <div className={classNames(style.container, total && style.process, className)} aria-hidden={true}>
            <div className={style.progress}>
                <div
                    className={style.bar}
                    style={{
                        transform: `translate(${ratio}%, 0)`
                    }}
                />
            </div>
        </div>
    );
}

export default Progress;
