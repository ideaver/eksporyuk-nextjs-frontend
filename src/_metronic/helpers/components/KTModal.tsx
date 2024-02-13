import React, { FC } from 'react'
import clsx from 'clsx'
import { WithChildren } from '../react18MigrationHelpers'
import { Buttons } from '@/stories/molecules/Buttons/Buttons'
import { KTIcon } from '..'

type Props = {
    className?: string
    dataBsTarget: string
    fade?: boolean
    modalSize?: string
    modalScrollable?: boolean
    modalCentered?: boolean
    modalFullscreen?: boolean
    modalDialogScrollable?: boolean
    dataBsDismiss?: string
    iconClose?: string | JSX.Element
    shadow?: boolean
    background?: string
    stacked?: boolean
    mousedown?: boolean
    title?: string
    bodyText?: string
    onClose?: () => void
    buttonClose?: boolean | JSX.Element
    buttonSubmit?: boolean | JSX.Element
    nameButtonModal?: string
}

const KTModal: FC<Props & WithChildren> = (props) => {
    const {
        className,
        dataBsTarget,
        fade,
        modalSize,
        modalScrollable,
        modalCentered,
        modalFullscreen,
        modalDialogScrollable,
        dataBsDismiss,
        iconClose = (
            <KTIcon iconName="cross" className="fs-2x" />
        ),
        shadow,
        background,
        stacked,
        mousedown,
        title,
        bodyText,
        onClose,
        children,
        buttonClose = (
            <Buttons buttonColor='secondary' classNames="" data-bs-dismiss="modal">Close</Buttons>
        ),
        buttonSubmit = (
            <Buttons classNames="">Save changes</Buttons>
        ),
        nameButtonModal
    } = props

    return (
        <div>
            <Buttons buttonColor="primary" classNames="" data-bs-toggle="modal" data-bs-target={`#${dataBsTarget}`}>
                {nameButtonModal}
            </Buttons>

            <div className={clsx("modal", fade && "fade")} tabIndex={-1} id={dataBsTarget} data-bs-backdrop="static">
                <div className={clsx
                    (
                        "modal-dialog",
                        modalDialogScrollable && "modal-dialog-scrollable",
                        background && `bg-${background}`,
                        shadow && "shadow-none",
                        modalSize && `modal-${modalSize}`,
                        modalScrollable && "modal-dialog-scrollable",
                        modalCentered && "modal-dialog-centered",
                        modalFullscreen && "modal-fullscreen",
                        stacked && "modal-stacked"
                    )
                }>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{title}</h3>
                            {iconClose && (
                                <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>
                                    {iconClose}
                                </div>
                            )}
                        </div>
                        <div className="modal-body">
                            <p>{bodyText}</p>
                            {children}
                        </div>
                        <div className="modal-footer">
                            {buttonClose}
                            {buttonSubmit}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { KTModal }
