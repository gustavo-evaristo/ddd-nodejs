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
}
