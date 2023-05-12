import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";

describe("Answear question test", () => {
  let inMemoryAnswersRepository: InMemoryAnswersRepository;
  let answerQuestion: AnswerQuestionUseCase;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    answerQuestion = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("Should be able to create a answear question", async () => {
    const answear = await answerQuestion.execute({
      content: "new content",
      instructorId: "1",
      questionId: "2",
    });

    expect(answear.content).toBe("new content");
  });
});
