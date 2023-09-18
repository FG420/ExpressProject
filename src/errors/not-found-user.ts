export class UserNotFound extends Error {
    constructor(user: string) {
        super();
        this.name = 'UserNotFound';
        this.message = `${user} user not found`;
    }
}