import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  private answears: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.answears.push(answer);
  }
}
