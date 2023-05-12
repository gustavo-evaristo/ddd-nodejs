import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { CreateQuestionUseCase } from "./create-question";

describe("Get question by slug test", () => {
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let getQuestionBySlugUseCase: GetQuestionBySlugUseCase;
  let createQuestionUseCase: CreateQuestionUseCase;

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    getQuestionBySlugUseCase = new GetQuestionBySlugUseCase(
      inMemoryQuestionRepository
    );

    createQuestionUseCase = new CreateQuestionUseCase(
      inMemoryQuestionRepository
    );
  });

  it("Should be able to get question by slug", async () => {
    await createQuestionUseCase.execute({
      authorId: "1",
      title: "my-question",
      content: "question content",
    });

    const slug = "my-question";

    const { question } = await getQuestionBySlugUseCase.execute({
      slug,
    });

    expect(question.slug.value).toBe(slug);
    expect(inMemoryQuestionRepository.questions[0].slug.value).toBe(slug);
  });
});
