/*****database & storage Service*****/
import conf from '../conf/conf.js'
import { Client,  Databases, Query } from "appwrite";

export class DBService{
  client = new Client();
  databases;

  constructor(){
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  //1)database service (For structured data json)
  //we are creating slug as document_id
  async createPost({title, slug, content, featuredImage, status, userId}){
    try {
        return await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug,  //as a document id
          {
            title,
            content,
            featuredImage,
            status,
            userId
          }
        )
    } 
    catch (error) {
        console.log("Appwrite Service :: createPost :: error", error);
    }
  }

  async updatePost(slug, {title, content, featuredImage, status}){
    try {
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug,
          {
            title,
            content,
            featuredImage,
            status
          }
        )
    } 
    catch (error) {
        console.log("Appwrite Service :: updatePost :: error", error);
    }
  }

  async deletePost(slug){
    try {
        await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug
        ) 
        return true; //successfully deleted 
    } 
    catch (error) {
        console.log("Appwrite Service :: deletePost :: error", error);
        return false;   
    }
  }

  async getPost(slug){
    try {
        return await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug
        )
    } 
    catch (error) {
        console.log("Appwrite Service :: getPost :: error", error);
        return false;
    }
  }

  //we want only those posts who has active status
  async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          queries
          //OR
          // [
          //   Query.equal("status", "Active")
          // ]
        )
    } 
    catch (error) {
        console.log("Appwrite Service :: getPosts :: error", error);
        return false;
    }
  }

}

const dbService = new DBService();
export default dbService;