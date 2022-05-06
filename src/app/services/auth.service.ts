import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private __global: GlobalService) { }

  login(params: { email:string, password:string }){
    const { email, password } = params;
    return {
      value: 1,
      user:{
        id: 1,
        user: "Demo User",
        email,
      },
      token: Math.random().toString(36).substring(2),
    }
  }

  async getTokenAuth(){
    const  { value }  = await Storage.get({ key: this.__global.STORAGE_TOKEN });
    return value;
  }

  logout(){
    Storage.clear();
  }
}
