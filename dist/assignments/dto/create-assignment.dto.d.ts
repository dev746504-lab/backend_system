export declare class CreateAssignmentDto {
    title: string;
    description?: string;
    type: 'online' | 'offline';
    examId?: string;
    attachedMaterialIds?: string[];
    dueDate: string;
    maxScore: number;
}
