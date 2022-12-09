import Person from "../src/Person";
import axios from "axios";
import { error } from "console";
// import { mockdata } from './mockData'
const jim = new Person("Jim", "Male");
// eslint-disable-next-line @typescript-eslint/no-empty-function
// jim.getUser = jest.fn(() => {});

describe("should test quote logic", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should test getUser", () => {
    expect(jim.getUser).toBeDefined();
  });
  test("should test getUserProfile", () => {
    expect(jim.getUserProfile).toBeDefined();
  });
  test("getUser a positive  scenario", async () => {
    await jim.getUser();
    const url = "https://cdn.credilio.in/interviews/backend-e1/User.json";
    const userData = await axios.get(url);
    if (userData) {
      return userData.data;
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toEqual(Error("failed for User Service"));
    }
  });
  // eslint-disable-next-line jest/no-identical-title
  test("getUserProfile a positive  scenario", async () => {
    await jim.getUserProfile();
    const url =
      "https://cdn.credilio.in/interviews/backend-e1/UserProfile.json";
    const userData = await axios.get(url);
    if (userData) {
      await userData.data;
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toEqual(Error("Failed For User Profile Service"));
    }
  });
});
