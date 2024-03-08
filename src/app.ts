import Express, { Request, Response } from 'express';
import User from './models/User';
import validate from './middleware/validateSchema';
import { createUserSchema, getUserSchema, updateUserSchema } from './schemas/UserSchema';

const app = Express();

app.use(Express.json());

const users: User[] = [];

app.get('/', (req: Request, res: Response) => res.json({ message: 'Hello world!' }));

app.post('/users/create', validate(createUserSchema), (req, res) => {
  const { name, age, cpf }: User = req.body

  const user = { 
    id: users.length === 0 ? 1 : users.slice(-1)[0].id + 1,
    name, 
    age, 
    cpf 
  }

  users.push(user);

  res.status(200).json({
    status: 'Created!',
    message: 'The user has been created successfully!',
    data: user
  });
});

app.get('/users', (req, res) => {
  res.status(200).json({
    status: 'Ok!',
    message: 'The data has been fetched successfully!',
    data: users
  });
});

app.get('/users/:id', validate(getUserSchema), (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if(userIndex === -1) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'The user doesn\'t exist'
    });
  }

  res.status(200).json({
    status: 'Ok!',
    message: 'The data has been fetched successfully!',
    data: users[userIndex]
  });
});

app.delete('/users/delete/:id', validate(getUserSchema), (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if(userIndex === -1) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'The user doesn\'t exist'
    });
  }

  users.splice(userIndex, 1);

  res.status(200).json({
    status: 'Deleted!',
    message: 'The user has been deleted successfully!'
  });
});

app.patch('/users/update/:id', validate(updateUserSchema), (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if(userIndex === -1) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'The user doesn\'t exist'
    });
  }

  const { name, age, cpf } = req.body;

  if(name) {
    users[userIndex].name = name;
  }

  if(age) {
    users[userIndex].age = age;
  }

  if(cpf) {
    users[userIndex].cpf = cpf;
  }

  res.status(200).json({
    status: 'Updated!',
    message: 'The user has been updated successfully!',
    data: users[userIndex]
  });
});


export default app;