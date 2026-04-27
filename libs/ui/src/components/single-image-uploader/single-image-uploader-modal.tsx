import Modal, { IModalProps } from '../modals/modal'
import {
    ISingleImageUploadProps,
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
