import { AppDataSource } from "./config";

export const initializeDb = async() => {
    try {
        await AppDataSource.initialize();
    } catch(err) {
        console.log(err);
    }
}