export type AuthenticatedUserProperty = {
    id?: string;
    name?: string;
    check_in?: string;
    check_out?: string;
}
export type AuthenticatedUser = {
    id?: string;
    staff?: string;
    email?: string;
    name?: string;
    isLoggedIn: boolean;
    token?: string;
    property?: AuthenticatedUserProperty;
}
