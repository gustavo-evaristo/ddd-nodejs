import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";
import { makeQuestion } from "@/test/factories/makeQuestion";
import { DeleteQuestionUseCase } from "./delete-question";

describe("Delete Question test", () => {
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let deleteQuestion: DeleteQuestionUseCase;

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    deleteQuestion = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  });

  it("Should be able to delete a question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionRepository.create(question);

    await deleteQuestion.execute({ questionId: question.id.toString() });

    expect(question.id).toBeTruthy();

    expect(inMemoryQuestionRepository.questions).toHaveLength(0);
  });
});
