export class TokenService {
    private readonly tokenKey: string = "token";
  
    saveToken(token: string): void {
      localStorage.setItem(this.tokenKey, token);
    }
  
    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
  
    deleteToken(): void {
      localStorage.removeItem(this.tokenKey);
    }
  }
  