import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentRepository {
  create(Answer: AnswerComment): Promise<void>;
}
