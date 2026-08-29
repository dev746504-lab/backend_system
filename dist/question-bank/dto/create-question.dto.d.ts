export declare class CreateQuestionDto {
    subject?: string;
    topic?: string;
    type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'essay';
    content: string;
    options?: string[];
    correctAnswer?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[];
}
