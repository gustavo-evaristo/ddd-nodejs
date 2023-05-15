import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { makeAnswer } from "@/test/factories/makeAnswer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

describe("Edit Answer test", () => {
  let inMemoryAnswerRepository: InMemoryAnswersRepository;
  let editAnswer: EditAnswerUseCase;

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();

    editAnswer = new EditAnswerUseCase(inMemoryAnswerRepository);
  });

  it("Should be able to edit a answer", async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID("1") });

    await inMemoryAnswerRepository.create(answer);

    await editAnswer.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "new content",
    });

    expect(inMemoryAnswerRepository.answers[0]).toMatchObject({
      content: "new content",
    });
  });

  it("Should not be able to edit a answer from another user", async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID("1") });

    await inMemoryAnswerRepository.create(answer);

    expect(async () =>
      editAnswer.execute({
        authorId: "2",
        answerId: answer.id.toString(),
        content: "new content",
      })
    ).rejects.toThrowError("Not allowed");
  });
});
