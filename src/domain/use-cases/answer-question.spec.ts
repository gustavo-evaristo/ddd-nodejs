import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../entities/answer";

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    console.log(answer);
    return;
  },
};

test("create an answear", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answear = await answerQuestion.execute({
    content: "new content",
    instructorId: "1",
    questionId: "2",
  });

  expect(answear.content).toBe("new content");
});
