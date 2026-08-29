declare class ExamQuestionRefDto {
    questionId: string;
    weight: number;
}
export declare class CreateExamDto {
    title: string;
    type: 'exam' | 'quiz' | 'worksheet';
    questionRefs: ExamQuestionRefDto[];
    totalScore: number;
    durationMin?: number;
}
export {};
