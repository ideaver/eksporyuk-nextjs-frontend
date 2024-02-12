import { FC } from 'react'
import clsx from 'clsx'
import { WithChildren } from '../react18MigrationHelpers'

// Wrapper on table:
// https://preview.keenthemes.com/html/metronic/docs/base/tables

type Props = {
    className: string
    responsive?: string
    color?: string
    table?: boolean
    border?: boolean
    dashed?: boolean
    bordered?: boolean
    striped?: boolean
    rounded?: boolean
    flush?: boolean
    hover?: boolean
    utilityG?: number
    utilityGY?: number
    utilityGX?: number
}

const KTTable: FC<Props & WithChildren> = (props) => {
    const {
        className,
        responsive,
        utilityG,
        utilityGX,
        utilityGY,
        dashed,
        bordered,
        color,
        rounded,
        striped,
        flush,
        hover,
        children,
    } = props
    return (
        <div className={`${responsive}`}>
            <table className={clsx(
                'table',
                className && className,
                {
                    'table-row-bordered': bordered,
                    'table-row-dashed': dashed,
                    'table-rounded': rounded,
                    'table-striped': striped,
                    'table-flush': flush,
                    'table-hover': hover,
                },
                utilityG && `g-${utilityG}`,
                utilityGX && `gx-${utilityGX}`,
                utilityGY && `gy-${utilityGY}`,
                rounded && `card-${rounded}`,
                color && `table-${color}`
            )}

            >
                {children}
            </table>
        </div>
    )
}

export { KTTable }
