export interface User {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  photoURL: string;
  phoneNumber: string | null;
  role: string;
}
