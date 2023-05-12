import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "@/test/factories/makeQuestion";

describe("Get question by slug test", () => {
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let getQuestionBySlugUseCase: GetQuestionBySlugUseCase;

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    getQuestionBySlugUseCase = new GetQuestionBySlugUseCase(
      inMemoryQuestionRepository
    );
  });

  it("Should be able to get question by slug", async () => {
    const newQuestion = makeQuestion();

    await inMemoryQuestionRepository.create(newQuestion);

    const slug = "my-question";

    const { question } = await getQuestionBySlugUseCase.execute({
      slug,
    });

    expect(question.slug.value).toBe(newQuestion.slug.value);
    expect(inMemoryQuestionRepository.questions[0].slug.value).toBe(
      newQuestion.slug.value
    );
  });
});
