import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type SubmissionDocument = HydratedDocument<Submission>;

@Schema({ timestamps: true })
export class Submission {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Assignment', required: true, index: true })
  assignmentId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, index: true })
  studentId: Types.ObjectId;

  /** Chốt lại maxScore của assignment tại thời điểm nộp, để validate score không phụ thuộc thay đổi sau này. */
  @Prop({ required: true, min: 0 })
  maxScoreSnapshot: number;

  @Prop({ trim: true })
  textContent?: string;

  @Prop({ type: [String], default: [] })
  fileUrls: string[];

  @Prop()
  submittedAt?: Date;

  @Prop({
    min: 0,
    validate: {
      validator: function (this: SubmissionDocument, v: number) {
        return v == null || v <= this.maxScoreSnapshot;
      },
      message: 'score vượt quá maxScore của bài tập',
    },
  })
  score?: number;

  @Prop({ trim: true, maxlength: 1000 })
  feedback?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  gradedBy?: Types.ObjectId;

  @Prop()
  gradedAt?: Date;

  @Prop({ enum: ['not_submitted', 'submitted', 'late', 'graded'], default: 'not_submitted' })
  status: 'not_submitted' | 'submitted' | 'late' | 'graded';
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
SubmissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });
