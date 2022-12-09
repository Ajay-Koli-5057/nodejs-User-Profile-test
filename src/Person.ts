import axios from "axios";
import { Parser } from "json2csv";
import fs from "fs";

export default class Person {
  public name;
  public gender;

  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }

  getUser = async () => {
    const url = "https://cdn.credilio.in/interviews/backend-e1/User.json";
    const userData = await axios.get(url);
    if (userData) {
      return userData.data;
    } else {
      throw Error("failed for User Service");
    }
  };

  getUserProfile = async () => {
    const url =
      "https://cdn.credilio.in/interviews/backend-e1/UserProfile.json";
    const userData = await axios.get(url);
    if (userData) {
      return userData.data;
    } else {
      throw Error("Failed For User Profile Service");
    }
  };
  introduce = async () => {
    try {
      const trueCount = {};
      const falseCount = {};
      const arry: any = [];
      const getUserdata = await this.getUser();
      if (!getUserdata) {
        throw Error("failed for User Service");
      }
      const getUserProfiledata = await this.getUserProfile();
      if (!getUserProfiledata) {
        throw Error("failed for User Service");
      }
      getUserdata.map((data) => {
        const addressItem = getUserProfiledata.find(
          (profile) => profile.userId === data.id
        );
        if (data.isActive == true && addressItem.userId == data.id) {
          trueCount[addressItem.city] = (trueCount[addressItem.city] || 0) + 1;
        } else if (data.isActive == false && addressItem.userId == data.id) {
          falseCount[addressItem.city] =
            (falseCount[addressItem.city] || 0) + 1;
        }
      });
      const output = Object.entries(trueCount).map(([city, activeCount]) => ({
        city,
        activeCount,
      }));
      const output1 = Object.entries(falseCount).map(
        ([city, inactiveCount]) => ({ city, inactiveCount })
      );
      output.forEach((data) => {
        output1.forEach((element) => {
          if (data.city == element.city) {
            data = Object.assign(data, {
              inactiveCount: element.inactiveCount,
            });
            arry.push(data);
          }
        });
      });
      const parserObj = new Parser();
      const csv = parserObj.parse(arry);
      const randomNumber = Math.random() * 4;
      fs.writeFileSync(`./data${randomNumber}.csv`, csv);
      console.log("*** CSV ***");
      console.log(csv);
      return `Hi, I am ${this.name}. I am ${this.gender}.`;
    } catch (error) {
      console.log("error", error);
    }
  };
}
