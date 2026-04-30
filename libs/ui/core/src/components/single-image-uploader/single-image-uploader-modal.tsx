import type { IModalProps } from '../modals/modal';
import Modal from '../modals/modal'
import type {
    ISingleImageUploadProps} from './single-image-uploader';
import {
    SingleImageUpload,
} from './single-image-uploader'

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

export { SingleImageUploaderModal }
