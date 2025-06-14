//Auth Service
//see appwrite doc for auth for below methods

import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();  //from appwrite
  account;  //here we're just creating account variable bcz it needs project_id & endpoint

  constructor(){
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //async bcz dont want to procced until account creation
  async createAccount({email, password, name}){
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name)  //bcz acc.create method requires 1st parameter as unique id

      if(userAccount){
        //call another method(means if user acc is created then do login directly)
        return this.login({email, password});
      }
      else{
        return userAccount;
      }
    } 
    catch (error) {
      throw error;
    }
  }

  async login({email, password}){
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error;
    }
  }

  async getCurrentUser(){
    try {
      return await this.account.get();
    } 
    catch (error) {
        console.log("Appwrite Service :: getCurrentUser :: error", error);
    }

    return null;  //if user does'nt exist
  }

  async logout(){
    try {
      return await this.account.deleteSessions();
    } 
    catch (error) {
        console.log("Appwrite Service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;