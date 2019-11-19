import User from '../models/User';

class TeacherController {
  async index(req, res) {
    const providers = await User.findAll({
      where: {
        teacher: true,
      },
      attributes: ['id', 'name', 'email'],
    });

    return res.json(providers);
  }
}

export default new TeacherController();
