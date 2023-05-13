import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";
import { makeQuestion } from "@/test/factories/makeQuestion";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

describe("Edit Question test", () => {
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let editQuestion: EditQuestionUseCase;

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    editQuestion = new EditQuestionUseCase(inMemoryQuestionRepository);
  });

  it("Should be able to edit a question", async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID("1") });

    await inMemoryQuestionRepository.create(question);

    await editQuestion.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      title: "new title",
      content: "new content",
    });

    expect(inMemoryQuestionRepository.questions[0]).toMatchObject({
      title: "new title",
      content: "new content",
    });
  });

  it("Should not be able to edit a question from another user", async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID("1") });

    await inMemoryQuestionRepository.create(question);

    expect(async () =>
      editQuestion.execute({
        authorId: "2",
        questionId: question.id.toString(),
        title: "new title",
        content: "new content",
      })
    ).rejects.toThrowError("Not allowed");
  });
});
