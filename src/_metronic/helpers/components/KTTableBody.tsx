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
    fontWeight?: string
    textColor?: string
    aligment?: string


}

const KTTableBody: FC<Props & WithChildren> = (props) => {
    const {
        className,
        border,
        color,
        active,
        children,
        fontWeight,
        textColor,
        aligment
    } = props
    return (
        <tbody>
            <tr className={clsx(
                className && className,
                {
                    'table-active': active,
                },
                color && `border-${color}`,
                border && `border-${border}`,
                fontWeight && `fw-${fontWeight}`,
                textColor && `text-${textColor}`,
                aligment && `text-${aligment}`
            )}

            >
                {children}
            </tr>
        </tbody>
    )
}

export { KTTableBody }
