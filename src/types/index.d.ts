declare global {
    namespace Express {
        interface User {
            id: number;
            username: string;
            fullName: string;
            address: string;
            phone: string;
            avatar: string | null;
            roleName: string | undefined;
        }
    }
}

export {};