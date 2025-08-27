export type Show={
    id:number;
    url:string;
    name:string;
    genres:string[];
    summary?:string;
    rating:{average?:number};
    image?:{
        medium:string;
    };
}