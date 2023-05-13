import { QuestionRepository } from "../repositories/question-repository";

interface DeleteQuestionUseCaseRequest {
  questionId: string;
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({ questionId }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not exists");
    }

    await this.questionRepository.delete(question);
  }
}
