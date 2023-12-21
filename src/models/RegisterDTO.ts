class RegisterDTO {
    id?: number
    role?: string
    email: string
    firstName: string
    lastName: string
    username: string
    password: string
    confirmPass: string
    phone: string
    country: string

    constructor(email: string, firstName: string, lastName: string, username: string, password: string, confirmPass: string, phone: string, country: string, id?: number, role?: string) {
        this.id = id;
        this.role = role;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.confirmPass = confirmPass;
        this.phone = phone;
        this.country = country;
    }
}

export default RegisterDTO;