import { Request,Response } from "express";
import Tour from "../../models/tour.model";
import { json } from "sequelize";

export const index = (req:Request,res: Response) => {
    res.render("client/pages/cart/index",{
        pageTitle: "Cart"
    })
}
export const listJson = async (req: Request, res: Response) => {
    const cart = req.body;
    const tours = [];
    for(const item of cart){
        const tour = await Tour.findOne({
            raw: true,
            where:{
                id: item.tourId,
                deleted: false,
                status: "active"
            }
        });
        tour["quantity"] = item.quantity;
        tour["priceSpecial"] = (1-tour["discount"]/100)*tour["price"];
        tour["image"] = JSON.parse(tour["images"])[0];
        tour["total"] = tour["priceSpecial"]*tour["quantity"];
        tours.push(tour);
    }
    const total = tours.reduce((sum,item) => sum + item.total,0);
    res.send({
        code: 200,
        tours: tours,
        total: total
    })
}