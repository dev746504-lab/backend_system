export declare class SendNotificationDto {
    scope: 'institution' | 'class' | 'user';
    classId?: string;
    recipientUserId?: string;
    title: string;
    content: string;
    type?: 'announcement' | 'assignment' | 'grade' | 'system';
}
