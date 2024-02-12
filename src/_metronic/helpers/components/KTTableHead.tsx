import { FC } from 'react'
import clsx from 'clsx'
import { WithChildren } from '../react18MigrationHelpers'

// Wrapper on table:
// https://preview.keenthemes.com/html/metronic/docs/base/tables

type Props = {
    className?: string
    color?: string
    border?: string

}

const KTTableHead: FC<Props & WithChildren> = (props) => {
    const {
        className,
        border,
        color,
        children,
    } = props
    return (
        <thead>
            <tr className={clsx(
                className && className,
                {

                },
                color && `border-${color}`,
                border && `border-${border}`
            )}

            >
                {children}
            </tr>
        </thead>
    )
}

export { KTTableHead }
