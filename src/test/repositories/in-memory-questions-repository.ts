import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionRepository {
  public questions: Question[] = [];

  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find((item) => item.slug.value === slug);

    return question ?? null;
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find((item) => item.id.toString() === id);

    return question ?? null;
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.questions.findIndex(
      (item) => item.id.toString() === question.id.toString()
    );

    this.questions.splice(itemIndex, 1);
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.questions.findIndex(
      (item) => item.id.toString() === question.id.toString()
    );

    this.questions[itemIndex] = question;
  }
}
