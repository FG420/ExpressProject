import { User } from "../../../api/user/user.entity";

export interface UserIdentity {
    id?: string;
    provider: string;
    credentials: {
        username: string;
        password: string;
    };
    user: User;
}
