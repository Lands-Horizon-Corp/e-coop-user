// import attachmentAudio from '@/assets/images/file-thumbnails/attachment-audio.svg'
// import attachmentDoc from '@/assets/images/file-thumbnails/attachment-doc.svg'
// import attachmentpdf from '@/assets/images/file-thumbnails/attachment-pdf.svg'
// import attachmentSheet from '@/assets/images/file-thumbnails/attachment-sheet.svg'
// import attachmentTxt from '@/assets/images/file-thumbnails/attachment-txt.svg'
// import attachmentVideo from '@/assets/images/file-thumbnails/attachment-video.svg'
import { FileXIcon, ImageIcon } from '../icons/index'
import Image from '../image'

export const FileTypeIcons = {
    audio: <Image alt="attachment-audio" src="./attachment-audio.svg" />,
    video: <Image alt="attachment-video" src="./attachment-video.svg" />,
    doc: <Image alt="attachment-doc" src="./attachment-doc.svg" />,
    pdf: <Image alt="attachment-pdf" src="./attachment-pdf.svg" />,
    sheet: <Image alt="attachment-sheet" src="./attachment-sheet.svg" />,
    text: <Image alt="attachment-text" src="./attachment-txt.svg" />,
    image: (
        <div className="flex size-8 items-center justify-center rounded-sm bg-primary/10">
            <ImageIcon className="size-5 text-primary/70" />
        </div>
    ),
    compressed: <Image alt="attachment-compressed" src="" />,
    code: <Image alt="attachment-code" src="" />,
    font: <Image alt="attachment-font" src="" />,
    ebook: <Image alt="attachment-ebook" src="" />,
    presentation: <Image alt="attachment-presentation" src="" />,
    unknown: (
        <div className="flex size-8 items-center justify-center rounded-sm bg-slate-100">
            <FileXIcon className="size-5 text-slate-800" />
        </div>
    ),
}
