import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

interface Csrf {
  csrfToken: string;
}

interface Tokens {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _accessTokenKey = 'accessToken';
  private _refreshTokenKey = 'refreshToken';

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private http: HttpClient,
  ) {}

  get localStorage() {
    return this._document.defaultView?.localStorage;
  }

  get accessToken() {
    if (!this.localStorage) {
      return null;
    }

    const token = this.localStorage.getItem(this._accessTokenKey);

    return token;
  }

  get refreshToken() {
    if (!this.localStorage) {
      return null;
    }

    const token = this.localStorage.getItem(this._refreshTokenKey);

    return token;
  }

  get isLogged() {
    return this.accessToken !== null;
  }

  private saveTokens(tokens: Tokens) {
    if (!this.localStorage) {
      return;
    }

    this.localStorage.setItem(this._accessTokenKey, tokens.access_token);
    this.localStorage.setItem(this._refreshTokenKey, tokens.refresh_token);
  }

  eraseTokens() {
    if (!this.localStorage) {
      return;
    }

    this.localStorage.removeItem(this._accessTokenKey);
    this.localStorage.removeItem(this._refreshTokenKey);
  }

  get_csrf() {
    return this.http.get<Csrf>(
      'http://localhost:8000/api/auth/get-csrf-token/',
    );
  }

  login(email: string, password: string) {
    const body = {
      email,
      password,
    };

    return this.http
      .post<Tokens>('http://localhost:8000/api/auth/login/', body, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          this.saveTokens(response);
        }),
      );
  }
}
