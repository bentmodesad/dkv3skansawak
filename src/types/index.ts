export interface Member {
  id: string;
  noAbsen: string;
  name: string;
  gender: string;
  role: string;
  photo: string;
  status?: string;
  createdAt?: string;
}

export interface Photo {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  views?: number;
}

export interface Settings {
  className: string;
  schoolName: string;
  announcement: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface User {
  username: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, remember: boolean) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoggedIn: boolean;
}