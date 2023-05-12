import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";

describe("Question test", () => {
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let createQuestion: CreateQuestionUseCase;

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    createQuestion = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it("Should be able to create a question", async () => {
    const { question } = await createQuestion.execute({
      authorId: "1",
      title: "Nova pergunta",
      content: "conteudo da pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionRepository.questions[0].id).toBe(question.id);
  });
});
