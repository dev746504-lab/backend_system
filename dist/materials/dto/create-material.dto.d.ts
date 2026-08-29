export declare class CreateMaterialDto {
    title: string;
    type: 'video' | 'document' | 'image' | 'audio' | 'interactive';
    subject?: string;
    gradeLevel?: string;
    tags?: string[];
    fileUrl: string;
    mimeType?: string;
    fileSize?: number;
}
