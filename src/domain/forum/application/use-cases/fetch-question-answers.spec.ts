import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { makeQuestion } from "@/test/factories/makeQuestion";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { makeAnswer } from "@/test/factories/makeAnswer";

describe("Get question by slug test", () => {
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let inMemoryAnswerRepository: InMemoryAnswersRepository;
  let fetchQuestionAnswersUseCase: FetchQuestionAnswersUseCase;
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository();

    fetchQuestionAnswersUseCase = new FetchQuestionAnswersUseCase(
      inMemoryAnswerRepository
    );
  });

  it("Should be able to fetch a question answers", async () => {
    const Question = makeQuestion();

    await inMemoryQuestionRepository.create(Question);

    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: Question.id, content: "First answer" })
    );

    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: Question.id, content: "Second answer" })
    );

    const { answers } = await fetchQuestionAnswersUseCase.execute({
      questionId: Question.id.toString(),
      page: 1,
    });

    expect(answers).toHaveLength(2);
  });

  it("Should be able to fetch pagination recent questions", async () => {
    const Question = makeQuestion();
    await inMemoryQuestionRepository.create(Question);

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: Question.id })
      );
    }

    const firstPage = await fetchQuestionAnswersUseCase.execute({
      page: 1,
      questionId: Question.id.toString(),
    });

    const secondPage = await fetchQuestionAnswersUseCase.execute({
      page: 2,
      questionId: Question.id.toString(),
    });

    expect(firstPage.answers).toHaveLength(20);
    expect(secondPage.answers).toHaveLength(2);
  });
});
