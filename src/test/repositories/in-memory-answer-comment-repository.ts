import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  public answerComments: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.answerComments.push(answerComment);
  }
}
