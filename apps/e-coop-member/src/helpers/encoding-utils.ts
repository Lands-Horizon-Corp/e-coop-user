export const toBase64 = <T = unknown>(val: T) => {
    const stringified = JSON.stringify(val)
    const base64String = btoa(stringified)
    return base64String
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)

        reader.readAsDataURL(file)
    })
}
