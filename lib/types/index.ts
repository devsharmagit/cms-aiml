export interface Category {
    name: string,
    id: string,
}
export interface DocumentType {
    id: string,
    name: string,
    url: string,
    publicId: string,
    createdAt: Date,
    userId: string,
    user?: {email: string, image: string | null}
}
export interface CategoryWithDocument {
    id: string,
    name: string,
documents: DocumentType[]
}