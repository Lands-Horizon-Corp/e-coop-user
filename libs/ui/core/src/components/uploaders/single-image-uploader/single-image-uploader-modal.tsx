import type { IModalProps } from '@e-coop-monorepo/ui/core'
import Modal from '@e-coop-monorepo/ui/core'

import type { ISingleImageUploadProps } from '.'
import SingleImageUpload from '.'

interface Props extends IModalProps {
    singleImageUploadProps: ISingleImageUploadProps
}

const SingleImageUploaderModal = ({
    singleImageUploadProps,
    ...props
}: Props) => {
    return (
        <Modal {...props}>
            <SingleImageUpload {...singleImageUploadProps} />
        </Modal>
    )
}

export default SingleImageUploaderModal
