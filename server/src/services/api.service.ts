import bcrypt from "bcryptjs";
import db from "../database/queries/admin.queries.js";
class ApiService {
  async users() {
    const response = await db.getUsers();
    return response;
  }
  async create(username: string, email: string, password: string) {
    const [user] = await db.findUserByName(username);
    if (user) {
      throw new Error("User already exist");
    }

    var salt = bcrypt.genSaltSync(8);
    var hashPassword = bcrypt.hashSync(password, salt);

    const [props] = await db.createUser(username, email, hashPassword, "user");
    const [action] = await db.addAction(props.id, "create");
    
    return { id: action.id, user_id: props.id };
  }
  async edit(
    id: string,
    username: string | undefined,
    email: string | undefined
  ) {
    const [user] = await db.findUserByID(id);
    if (!user) {
      throw new Error("User doesn't exist");
    }

    await db.editUser(id, username, email);
    const params = {
      username,
      email,
      prevName: user.username,
      prevEmail: user.email,
    };

    const [action]= await db.addAction(id, "update", params);
    return {id: action.id}
  }
}

export default new ApiService();
