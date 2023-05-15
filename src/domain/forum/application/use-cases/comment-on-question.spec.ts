import { InMemoryQuestionCommentRepository } from "@/test/repositories/in-memory-question-comment-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionRepository } from "@/test/repositories/in-memory-questions-repository";
import { makeQuestion } from "@/test/factories/makeQuestion";

describe("Question comment test", () => {
  let inMemoryQuestionRepository: InMemoryQuestionRepository;
  let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
  let commentOnQuestionUseCase: CommentOnQuestionUseCase;

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();

    commentOnQuestionUseCase = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository
    );
  });

  it("Should be able to create a question comment", async () => {
    const question = makeQuestion();

    await inMemoryQuestionRepository.create(question);

    const { questionComment } = await commentOnQuestionUseCase.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "conteudo do comentario",
    });

    expect(questionComment.id).toBeTruthy();
    expect(
      inMemoryQuestionCommentRepository.questionComments[0].content
    ).toEqual(questionComment.content);
  });
});
