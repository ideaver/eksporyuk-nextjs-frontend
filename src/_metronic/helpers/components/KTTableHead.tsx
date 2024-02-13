import { FC } from 'react'
import clsx from 'clsx'
import { WithChildren } from '../react18MigrationHelpers'

// Wrapper on table:
// https://preview.keenthemes.com/html/metronic/docs/base/tables

type Props = {
    className: string
    color?: string
    border?: string
    fontWeight?: string
    textColor?: string
    aligment?: string

}

const KTTableHead: FC<Props & WithChildren> = (props) => {
    const {
        className,
        border,
        color,
        children,
        fontWeight,
        textColor,
        aligment
    } = props
    return (
        <thead>
            <tr className={clsx(
                className && className,
                {
                    
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
        </thead>
    )
}

export { KTTableHead }
