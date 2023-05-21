const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
class Course {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuidv4();
  }

  toJson() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }
  async save() {
    const courses = await Course.getAll();
    courses.push(this.toJson()); // массив у нас потому что мы в джсоне его написали
    console.log(courses);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "courses.json"),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => { // нам тут нужна асинхронность чтобы не блокировать поток
      fs.readFile(
        path.join(__dirname, "..", "data", "courses.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content)); //получаем дату с джсона
          }
        }
      );
    });
  }

  static async getById(id) {
    const courses = await Course.getAll()
    return courses.find(item => item.id === id)
  }
}

module.exports = Course;
