import { FC } from 'react'
import clsx from 'clsx'
import { WithChildren } from '../react18MigrationHelpers'

// Wrapper on table:
// https://preview.keenthemes.com/html/metronic/docs/base/tables

type Props = {
    className?: string
    color?: string
    border?: string
    active?: boolean

}

const KTTableBody: FC<Props & WithChildren> = (props) => {
    const {
        className,
        border,
        color,
        active,
        children,
    } = props
    return (
        <tbody>
            <tr className={clsx(
                className && className,
                {
                    'table-active': active,
                },
                color && `border-${color}`,
                border && `border-${border}`
            )}

            >
                {children}
            </tr>
        </tbody>
    )
}

export { KTTableBody }
