import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";
import { makeQuestion } from "@/test/factories/makeQuestion";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

describe("Delete Question test", () => {
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let deleteQuestion: DeleteQuestionUseCase;

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    deleteQuestion = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  });

  it("Should be able to delete a question", async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID("1") });

    await inMemoryQuestionRepository.create(question);

    await deleteQuestion.execute({
      authorId: "1",
      questionId: question.id.toString(),
    });

    expect(inMemoryQuestionRepository.questions).toHaveLength(0);
  });

  it("Should not be able to delete a question from another user", async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID("1") });

    await inMemoryQuestionRepository.create(question);

    expect(async () =>
      deleteQuestion.execute({
        authorId: "2",
        questionId: question.id.toString(),
      })
    ).rejects.toThrowError("Not allowed");
  });
});
