import * as Yup from 'yup';

import Post from '../models/Post';
import User from '../models/User';

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      message: Yup.string().required(),
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { user_id, message } = req.body;

    const checkUser = await User.findOne({
      where: {
        id: req.userId,
        teacher: false,
      },
    });

    if (checkUser) {
      return res
        .status(401)
        .json({ error: 'You can only send messages if you are teacher' });
    }

    const checkIsTeacher = await User.findOne({
      where: {
        id: user_id,
        teacher: true,
      },
    });

    if (checkIsTeacher) {
      return res
        .status(401)
        .json({ error: 'You can only send messages to parents' });
    }

    const post = await Post.create({
      teacher_id: req.userId,
      message,
      user_id,
    });

    return res.json(post);
  }
}

export default new PostController();
