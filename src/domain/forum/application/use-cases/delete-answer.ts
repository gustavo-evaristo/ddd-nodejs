import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not exists");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.answerRepository.delete(answer);
  }
}
