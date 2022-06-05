export interface Photo {
    _id?: string;
    title: String;
    description: String;
    imagePath: string;
}



export interface UserResponse{
  message:string;
  token:string;
  code:number;
}
