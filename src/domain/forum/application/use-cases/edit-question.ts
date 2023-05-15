import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
  title: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not exists");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return { question };
  }
}
