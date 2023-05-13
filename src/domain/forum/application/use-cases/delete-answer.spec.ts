import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "@/test/factories/makeAnswer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

describe("Delete Answer test", () => {
  let inMemoryAnswerRepository: InMemoryAnswersRepository;
  let deleteAnswer: DeleteAnswerUseCase;

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();

    deleteAnswer = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  it("Should be able to delete a answer", async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityID("1"),
    });

    await inMemoryAnswerRepository.create(answer);

    await deleteAnswer.execute({
      authorId: "1",
      answerId: answer.id.toString(),
    });

    expect(inMemoryAnswerRepository.answers).toHaveLength(0);
  });

  it("Should not be able to delete a answer from another user", async () => {
    const answer = makeAnswer();

    await inMemoryAnswerRepository.create(answer);

    expect(async () =>
      deleteAnswer.execute({
        authorId: "2",
        answerId: answer.id.toString(),
      })
    ).rejects.toThrowError("Not allowed");
  });
});
