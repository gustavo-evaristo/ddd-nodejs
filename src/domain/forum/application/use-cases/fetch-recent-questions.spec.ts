import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";
import { makeQuestion } from "@/test/factories/makeQuestion";

describe("Get question by slug test", () => {
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let fetchRecentQuestionsUseCase: FetchRecentQuestionsUseCase;
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    fetchRecentQuestionsUseCase = new FetchRecentQuestionsUseCase(
      inMemoryQuestionRepository
    );
  });

  it("Should be able to fetch a questions", async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 23) })
    );

    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 20) })
    );

    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 18) })
    );

    const { questions } = await fetchRecentQuestionsUseCase.execute({
      page: 1,
    });

    expect(questions).toHaveLength(3);
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 18) }),
    ]);
  });

  it("Should be able to fetch pagination recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion());
    }

    const firstPage = await fetchRecentQuestionsUseCase.execute({
      page: 1,
    });

    const secondPage = await fetchRecentQuestionsUseCase.execute({
      page: 2,
    });

    expect(firstPage.questions).toHaveLength(20);
    expect(secondPage.questions).toHaveLength(2);
  });
});
