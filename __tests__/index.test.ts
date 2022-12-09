import Person from "../src/Person";

describe("Person name: Jim, gender: Male", () => {
  const name = "Jim";
  const gender = "Male";
  const person = new Person(name, gender);

  test(`Test name: ${name}`, () => {
    expect(person.name).toBe(name);
  });

  test(`Test gender: ${gender}`, () => {
    expect(person.gender).toBe(gender);
  });
});

describe("Person name: Jill, gender: Female", () => {
  const name = "Jill";
  const gender = "Female";
  const person = new Person(name, gender);

  test(`Test name: ${name}`, () => {
    expect(person.name).toBe(name);
  });

  test(`Test gender: ${gender}`, () => {
    expect(person.gender).toBe(gender);
  });
});
