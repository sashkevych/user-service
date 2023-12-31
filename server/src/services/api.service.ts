import db from "../repository/admin.queries.js";
import crypto from "../utils/bcrypt.utils..js";
class ApiService {
  async users() {
    const users = await db.selectUsers();
    return users;
  }
  async create(username: string, email: string, password: string) {
    const hashedPassword = crypto.createHash(password);

    const created_user = await db.insertUser(username,email,hashedPassword,"user");

    const action = await db.insertAction(created_user.id, "create");

    return { action_id: action.id, created_user };
  }
  async update(id: number,username: string | undefined,email: string | undefined) {

    const updatedUser = await db.updateUser(id, username, email);

    // mess
    const params = {username: updatedUser.username,email: updatedUser.email,prevName: username,prevEmail: email,};

    const action = await db.insertAction(id, "update", params);

    return { action_id: action.id, updatedUser };
  }
}

export default new ApiService();
