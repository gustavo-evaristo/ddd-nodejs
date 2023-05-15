import { InMemoryAnswerCommentRepository } from "@/test/repositories/in-memory-answer-comment-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { makeAnswer } from "@/test/factories/makeAnswer";

describe("Answer comment test", () => {
  let inMemoryAnswerRepository: InMemoryAnswersRepository;
  let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
  let commentOnAnswerUseCase: CommentOnAnswerUseCase;

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();

    commentOnAnswerUseCase = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository
    );
  });

  it("Should be able to create a answer comment", async () => {
    const answer = makeAnswer();

    await inMemoryAnswerRepository.create(answer);

    const { answerComment } = await commentOnAnswerUseCase.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "conteudo do comentario",
    });

    expect(answerComment.id).toBeTruthy();
    expect(inMemoryAnswerCommentRepository.answerComments[0].content).toEqual(
      answerComment.content
    );
  });
});
