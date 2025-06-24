/*****storage Service*****/
import conf from '../conf/conf.js'
import { Client, ID, Storage } from "appwrite";

export class StorageService{
  client = new Client();
  bucket;

  constructor(){
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteProjectId);

    this.bucket = new Storage(this.client);
  }

  //storage service (file upload services)(For unstructured Data like Images)
  async uploadFile(file){  //argument as whole file(not just filename)
    try {
        return await this.bucket.createFile(
          conf.appwriteBucketId,
          ID.unique(),  //stored as fileId
          file
        )
    } 
    catch (error) {
        console.log("Appwrite Service :: uploadFile :: error", error);
        return false;
    }
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
          conf.appwriteBucketId,
          fileId
        )
        return true;
    } 
    catch (error) {
        console.log("Appwrite Service :: deleteFile :: error", error);
        return false;
    }
  }

  //not making async bcz this func does not return promise
  getFileView(fileId){
    return this.bucket.getFileView(
      conf.appwriteBucketId,
      fileId
    )
  }

}

const storageService = new StorageService();
export default storageService;