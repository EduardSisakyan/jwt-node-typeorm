import { Request, NextFunction, Response } from 'express';
import { inject } from 'inversify';
import Types from '../config/types';
import { UserService } from '../service/userService';
import { controller, httpGet } from 'inversify-express-utils';

@controller('/api/user')
export class UserController {

    @inject(Types.UserService)
    private userService: UserService;


    @httpGet('/all')
    public async all(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.userService.getAll();
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @httpGet('/byId/:id')
    public async byId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.userService.getById(id);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @httpGet('/create/:name')
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.params.name;
            const result = await this.userService.save(name);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @httpGet('/:userId/vehicle/:vehicleId')
    public async vehicle(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const vehicleId = req.params.vehicleId;
            const result = await this.userService.newVehicle(userId, vehicleId);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }
}