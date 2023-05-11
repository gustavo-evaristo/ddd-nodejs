import { Slug } from "./slug";

test("should be able to create a new slug", () => {
    const slug = new Slug("example-question-title");

    expect(slug.value).toEqual("example-question-title");
});

test("should be able to create a new slug from text", () => {
    const slug = Slug.createFromText("Example Question Title");

    expect(slug.value).toEqual("example-question-title");
});
