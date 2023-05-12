import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(override?: Partial<QuestionProps>) {
  const question = Question.create({
    authorId: new UniqueEntityID("1"),
    title: "my-question",
    content: "question content",
    ...override,
  });

  return question;
}
