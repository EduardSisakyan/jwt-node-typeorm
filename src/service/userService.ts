import { injectable, inject } from 'inversify';
import Types from '../config/types';
import { User } from '../entity/user';
import { UserRepository } from '../repository/userRepository';

@injectable()
export class UserService {

    constructor(
        @inject(Types.UserRepository) private userRepository: UserRepository,
    ) {}

    public async getAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    public async getById(id: string): Promise<User> {
        const vehicle = await this.userRepository.findById(id);
        return vehicle;
    }

    public async save(name: string): Promise<string> {
        const created = await this.userRepository.save({ name });
        if (created) return 'User created successfully';
    }

    public async newVehicle(userId: string, vehicleId: string) {
        const user = await this.userRepository.findById(userId);
        if (user) {
            
        } else {
            throw 'Cant find user with that id';
        }
    }

}