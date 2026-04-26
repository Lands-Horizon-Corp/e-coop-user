import { cn } from '@e-coop-monorepo/shared/helpers'
import { useInfoModalStore } from '@e-coop-monorepo/shared/store'

import { Button } from '@e-coop-monorepo/ui'
import { Separator } from '@e-coop-monorepo/ui'

import Modal from './modal'

const InfoModal = () => {
    const {
        isOpen,
        onClose,
        onConfirm,
        infoDatas: {
            component,
            classNames,
            hideConfirm,
            confirmString,
            hideSeparator = false,
            ...rest
        },
    } = useInfoModalStore()

    return (
        <Modal onOpenChange={onClose} open={isOpen} {...rest} {...classNames}>
            {!hideSeparator && <Separator className="bg-muted/70" />}
            {component}
            {!hideSeparator && <Separator className="bg-muted/70" />}
            {!hideConfirm && (
                <div
                    className={cn(
                        'flex justify-end gap-x-2',
                        classNames?.footerActionClassName
                    )}
                >
                    <Button
                        className={cn(
                            'bg-muted/60 hover:bg-muted',
                            classNames?.closeButtonClassName
                        )}
                        onClick={onConfirm}
                        variant={'ghost'}
                    >
                        {confirmString}
                    </Button>
                </div>
            )}
        </Modal>
    )
}

export default InfoModal
