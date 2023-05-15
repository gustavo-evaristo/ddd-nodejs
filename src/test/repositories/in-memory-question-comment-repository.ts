import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentRepository
  implements QuestionCommentRepository
{
  public questionComments: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.questionComments.push(questionComment);
  }
}
