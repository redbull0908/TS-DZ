// Gender Enum
enum Gender {
  Male = "male",
  Female = "female"
}

enum Role {
  Admin = "admin",
  Moderator = "moderator",
  User = "user",
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode?: string;
  postalCode?: string;
  coordinates?: Coordinates;
  country?: string;
}

interface Hair {
  color: string;
  type: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface CompanyAddress extends Address { }

interface Company {
  department?: string;
  name?: string;
  title?: string;
  address?: CompanyAddress;
}

interface Crypto {
  coin?: string;
  wallet?: string;
  network?: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age?: number;
  gender?: Gender;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: Hair;
  ip?: string;
  address?: Address;
  macAddress?: string;
  university?: string;
  bank?: Bank;
  company?: Company;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: Crypto;
  role?: Role;
}

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

async function loadUsers(): Promise<UsersResponse> {
    const res = await fetch("https://dummyjson.com/users");
    return res.json() as Promise<UsersResponse>;  
}

async function example() {
  try {
    const data = await loadUsers();
    if (data != undefined) {
      if (data.users != undefined && data.users != null)
        data.users.forEach(x => {
          if (x != undefined) {
            console.log(x)
          }
        });
      throw new Error('Пользователей нет')
    }
    throw new Error('данные не получили')
  }
  catch {
    throw new Error('не удалось получить данные')
  }


}

console.log(example())