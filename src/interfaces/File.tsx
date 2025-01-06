import IUser from "./User"

export default interface IFile {
    id: number
    filename: string
    path: string
    mimetype: string
    size: number
    userId: number
    courseClassID: number
    createdAt: string
    updatedAt: string
    user: IUser
}