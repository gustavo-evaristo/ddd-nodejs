import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionRepository } from "../repositories/question-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answersRepository: AnswersRepository
  ) {}
  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return { question };
  }
}
