import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeAnswer } from "@/test/factories/makeAnswer";
import { makeQuestion } from "@/test/factories/makeQuestion";

describe("Answer question test", () => {
  let inMemoryAnswersRepository: InMemoryAnswersRepository;
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    chooseQuestionBestAnswer = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswersRepository
    );
  });

  it("Should be able to choose the question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryAnswersRepository.create(answer);
    await inMemoryQuestionRepository.create(question);

    await chooseQuestionBestAnswer.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    });

    expect(inMemoryQuestionRepository.questions[0].bestAnswerId).toBe(
      answer.id
    );
  });

  it("Should not be able to choose another user question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryAnswersRepository.create(answer);
    await inMemoryQuestionRepository.create(question);

    expect(
      async () =>
        await chooseQuestionBestAnswer.execute({
          answerId: answer.id.toString(),
          authorId: "3",
        })
    ).rejects.toThrowError("Not allowed");
  });
});
