import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import AuthService from '../service/AuthService';
import { API_URL } from '../utils/axios/index';

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setError(error) {
    this.error = error;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async login({ email, password }) {
    this.setLoading(true);

    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      this.setError(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async registration({ email, password, nickname }) {
    this.setLoading(true);
    try {
      const response = await AuthService.registration(email, password, nickname);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      this.setError(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    this.setLoading(true);

    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
