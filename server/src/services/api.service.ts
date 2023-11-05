import db from "../database/queries.js";
import crypto from "../utils/bcrypt.js";
class ApiService {
  async users() {
    const users = await db.selectUsers();
    return users;
  }
  async create(username: string, email: string, password: string) {
    // This is part of validation

    // const user = await db.selectUserByName(username);

    // if (user) {
    //   throw new Error("User already exist");
    // }

    const hashedPassword = crypto.createHash(password);

    const created_user = await db.insertUser(
      username,
      email,
      hashedPassword,
      "user"
    );

    // why i waiting here ?
    const action = await db.insertAction(created_user.id, "create");

    return { action_id: action.id, created_user };
  }
  async update(
    id: number,
    username: string | undefined,
    email: string | undefined
  ) {

    // This is part of validation
    // const user = await db.selectUserByID(id);
    // if (!user) {
      // throw new Error("User doesn't exist");
    // }

    const updatedUser = await db.updateUser(id, username, email);

    // mess
    const params = {
      username: updatedUser.username,
      email: updatedUser.email,
      prevName: username,
      prevEmail: email,
    };
    const action = await db.insertAction(id, "update", params);

    return { action_id: action.id, updatedUser };
  }
}

export default new ApiService();
