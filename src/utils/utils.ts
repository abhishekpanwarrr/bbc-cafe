import { User } from "../screens/RegisterScreen";

export const areAllValuesFilled = (user:User) => {
    for (const key in user) {
        if (user.hasOwnProperty(key) && user[key as keyof User] === "") {
            return false;
        }
    }
    return true;
};