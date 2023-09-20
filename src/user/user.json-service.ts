import { User } from './user';
import { UserService } from './user.service';
import fs from 'fs';

const USERS_JSON_FILE = 'src/user/users.json'; 

export class UserJSONService implements UserService {
    private users: User[] = [];

    constructor() {
        this.loadUsersFromJson(); 
    }

    private saveUsersToJson() {
        fs.writeFileSync(USERS_JSON_FILE, JSON.stringify(this.users, null, 2));
    }

    private loadUsersFromJson() {
        try {
            const data = fs.readFileSync(USERS_JSON_FILE, 'utf8');
            this.users = JSON.parse(data);
        } catch (error) {
            this.users = [];
        }
    }

    add(username: string): User {
        const newUser: User = {
            id: this.users.length + 1,
            username: username
        }
        this.users.push(newUser);

        this.saveUsersToJson(); 

        return newUser;
    }

    getById(id: number): User | null {
        const user = this.users.find(u => u.id === id);
        return user || null;
    }
}
