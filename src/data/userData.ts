export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  city: string;
  region: string;
  postcode: string;
  telephone: string;
}

export const testUser: UserData = {
  email: "test@example.com",
  firstName: "John",
  lastName: "Doe",
  company: "Company",
  address: "123 Main St",
  city: "San Salvador",
  region: "SS",
  postcode: "1101",
  telephone: "55555555",
};
