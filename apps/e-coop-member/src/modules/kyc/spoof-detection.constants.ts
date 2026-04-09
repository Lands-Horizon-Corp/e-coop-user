export const spoofErrorMessages = {
    ERR_NO_FILE_UPLOADED: 'No file uploaded. Please provide a selfie image.',
    ERR_NO_FACE:
        'No face detected in the image. Please provide a clear image of your face.',
    ERR_NOT_FRONTAL:
        'The image is not a frontal view of your face. Please face at the center properly.',
    ERR_MULTIPLE_FACES:
        'Multiple faces detected in the image. Please provide an image with only one face.',
    ERR_MOUTH_NOT_DETECTED:
        'Mouth not detected in the image. Please ensure your mouth is visible.',
    ERR_MOUTH_OPEN:
        'Mouth appears to be open in the image. Please keep your mouth closed and try again.',
    ERR_GLASSES_DETECTED:
        'Glasses detected in the image. Please remove your glasses and try again.',
    ERR_EYES_CLOSED:
        'Eyes appear to be closed in the image. Please open your eyes and try again.',
    ERR_EMOTION_NOT_NEUTRAL:
        'Other emotion detected in the image. Please maintain a neutral expression and try again.',
    ERR_UNKNOWN:
        'Unknown error occurred during spoof detection. Please try again.',
    SPOOF_DETECTED: 'Spoof detected please provide a valid selfie image',
} as const
