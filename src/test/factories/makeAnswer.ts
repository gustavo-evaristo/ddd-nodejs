import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(override?: Partial<Answer>): Answer {
  const answer = Answer.create({
    authorId: new UniqueEntityID("1"),
    questionId: new UniqueEntityID("1"),
    content: "my answer content",
    ...override,
  });

  return answer;
}
