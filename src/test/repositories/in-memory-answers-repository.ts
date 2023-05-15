import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = [];

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.answers.find(
      (answer) => answer.id.toString() === answerId
    );

    return answer ?? null;
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(
      (item) => item.id.toString() === answer.id.toString()
    );

    this.answers.splice(answerIndex, 1);
  }

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer);
  }

  async save(answer: Answer): Promise<Answer> {
    const itemIndex = this.answers.findIndex(
      (item) => item.id.toString() === answer.id.toString()
    );

    this.answers[itemIndex] = answer;

    return answer;
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ): Promise<Answer[]> {
    const answers = this.answers
      .filter((answer) => answer.questionId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return answers;
  }
}
