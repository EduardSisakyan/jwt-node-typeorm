import Types from './types';
import { Container } from 'inversify';
import { UserService } from '../service/userService';
import { UserRepository } from '../repository/userRepository';

import { UserController } from '../controller/userController';

const container: Container = new Container();

container.bind<UserController>(Types.Controller).to(UserController);

// Services
container.bind<UserService>(Types.UserService).to(UserService).inSingletonScope();

// Repositories
container.bind<UserRepository>(Types.UserRepository).to(UserRepository).inSingletonScope();

// Services

export { container };