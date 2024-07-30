import { promises as fs } from "fs";
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const port = 3005; // You can choose any port

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/login/:secretId", async (req, res) => {
  const { secretId } = req.params;
  const secretsFileContent = await fs.readFile("./data/secrets.json");
  let secretList = JSON.parse(secretsFileContent);
  const loggedInUserID = secretList.secrets[secretId];

  if (loggedInUserID) {
    res.status(200).json({ userId: loggedInUserID });
  } else {
    return res.status(404).json({ message: `Login failed` });
  }
});

app.get("/users", async (req, res) => {
  const usersFileContent = await fs.readFile("./data/users.json");
  let userList = JSON.parse(usersFileContent);

  res.json({
    users: userList.map((usr) => ({
      id: usr.id,
      firstName: usr.firstName,
      lastName: usr.lastName,
      managerId: usr.managerId,
      password: usr.password,
      photo: usr.photo || "",
      email: usr.email,
    })),
  });
});

app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const usersFileContent = await fs.readFile("./data/users.json");
  let userList = JSON.parse(usersFileContent);
  
  const user = userList.find((usr) => usr.id === id);

  if (user) {
    res.status(200).json({ user });
  } else {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no user could be found.` });
  }
});

// app.patch("/users", async (req, res) => {
//   const { student } = req.body;

//   if (!student) {
//     return res.status(400).json({ message: "Student is required" });
//   }

//   if (
//     !student.id?.trim() ||
//     !student.firstName?.trim() ||
//     !student.lastName?.trim() ||
//     !student.gender?.trim() ||
//     !student.birthday?.trim() ||
//     !student.profileImgUrl?.trim() ||
//     !student.parentContact
//   ) {
//     return res.status(400).json({ message: "Invalid data provided." });
//   }

//   const studentsFileContent = await fs.readFile("./data/students.json");
//   const studentList = JSON.parse(studentsFileContent);

//   const newStudent = {
//     intId: Math.round(Math.random() * 10000).toString(),
//     ...student,
//   };

//   studentList.push(newStudent);

//   await fs.writeFile("./data/students.json", JSON.stringify(studentList));

//   res.json({ student: newStudent });
// });

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
