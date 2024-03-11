import Express, { Request, Response } from 'express';
import User from './models/User';
import Role from './models/Role';
import validate from './middleware/validateSchema';
import { createUserSchema, getUserSchema, updateUserSchema } from './schemas/UserSchema';
import { createRoleSchema, getRoleSchema, updateRoleSchema } from './schemas/RoleSchema';

const app = Express();

app.use(Express.json());

const users: User[] = [];
const roles: Role[] = [];

app.get('/', (req: Request, res: Response) => res.json({ message: 'Hello world!' }));

app.post('/users/create', validate(createUserSchema), (req, res) => {
  const { name, age, cpf, role_id } = req.body;

  const user: User = { 
    id: users.length === 0 ? 1 : users.slice(-1)[0].id + 1,
    name, 
    age, 
    cpf,
    role: null
  }

  if(role_id) {
    const roleIndex = roles.findIndex((role) => role.id === parseInt(role_id));

    if(roleIndex === -1) {
      return res.status(404).json({
        status: 'Internal server error!',
        message: 'The role doesn\'t exist'
      });
    }

    user.role = roles[roleIndex];
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

  const { name, age, cpf, role_id } = req.body;

  if(name) {
    users[userIndex].name = name;
  }

  if(age) {
    users[userIndex].age = age;
  }

  if(cpf) {
    users[userIndex].cpf = cpf;
  }

  if(role_id) {
    const roleIndex = roles.findIndex((role) => role.id === parseInt(role_id));

    if(roleIndex === -1) {
      return res.status(404).json({
        status: 'Internal server error!',
        message: 'The role doesn\'t exist'
      });
    }

    users[userIndex].role = roles[roleIndex];
  }

  res.status(200).json({
    status: 'Updated!',
    message: 'The user has been updated successfully!',
    data: users[userIndex]
  });
});

app.post('/roles/create', validate(createRoleSchema), (req, res) => {
  const { name, description }: Role = req.body;

  const role = {
    id: roles.length === 0 ? 1 : roles.slice(-1)[0].id + 1,
    name,
    description
  }

  roles.push(role);

  res.status(200).json({
    status: 'Created!',
    message: 'The role has been created successfully!',
    data: role
  });
});

app.get('/roles', (req, res) => {
  res.status(200).json({
    status: 'Ok!',
    message: 'The data has been fetched successfully!',
    data: roles
  });
});

app.get('/roles/:id', validate(getRoleSchema), (req, res) => {
  const { id } = req.params;

  const roleIndex = roles.findIndex((role) => role.id === parseInt(id));

  if(roleIndex === -1) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'The role doesn\'t exist'
    });
  }

  res.status(200).json({
    status: 'Ok!',
    message: 'The data has been fetched successfully!',
    data: roles[roleIndex]
  });
});

app.delete('/roles/delete/:id', validate(getRoleSchema), (req, res) => {
  const { id } = req.params;

  const roleIndex = roles.findIndex((role) => role.id === parseInt(id));

  if(roleIndex === -1) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'The role doesn\'t exist'
    });
  }

  users.map((user) => {
    if(user.role !== null && user.role.id === roles[roleIndex].id) {
      user.role = null;
    }
  });

  roles.splice(roleIndex, 1);

  res.status(200).json({
    status: 'Deleted!',
    message: 'The role has been deleted successfully!'
  });
});

app.patch('/roles/update/:id', validate(updateRoleSchema), (req, res) => {
  const { id } = req.params;

  const roleIndex = roles.findIndex((role) => role.id === parseInt(id));

  if(roleIndex === -1) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'The role doesn\'t exist'
    });
  }

  const { name, description } = req.body;

  if(name) {
    roles[roleIndex].name = name;
  }

  if(description) {
    roles[roleIndex].description = description;
  }

  res.status(200).json({
    status: 'Updated!',
    message: 'The role has been updated successfully!',
    data: roles[roleIndex]
  });
});


export default app;