import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;
        const user = this.create({ username: username, password: password });

        await this.save(user);
    }
}
