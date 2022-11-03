import Category from "./Category";

class CouponModel{
    public id!: number;
    public title: string;
    public category: Category;
    public startDate: Date;
    public endDate:Date;
    public amount:number;
    public description:string;
    public price:number;
    public image: File | FileList |string ;
    


	constructor(id: number,
         title : string,
         category: Category,
         startDate: Date,
         endDate:Date,
         amount:number,
         description:string,
         price:number,
         image: File | FileList |string,
    )
         {
            this.id=id;
            this.title=title;
            this.category=category;
            this.startDate=startDate;
            this.endDate=endDate;
            this.amount=amount;
            this.price=price;
            this.description=description;
            this.image=image;

	}
	

}
export default CouponModel





    