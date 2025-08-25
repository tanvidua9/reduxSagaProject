export type Show={
    id:number;
    url:string;
    name:string;
    genres:String[];
    summary?:string;
    rating:{average?:number};
    image?:{
        medium:string;
    };
}