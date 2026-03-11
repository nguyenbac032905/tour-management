import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import { Json } from "sequelize/types/utils";

export const index = async (req: Request,res: Response) => {
    const tours = await Tour.findAll({
        raw: true,
        where: {
            deleted: false
        }
    });
    tours.forEach(item => {
        item["priceSpecial"] = item["price"]*(1-item["discount"]/100);
        if(item["images"]){
            item["image"] = JSON.parse(item["images"])[0];
        }
    });
    console.log(tours);
    res.render("admin/pages/tours/index",{
        pageTitle: "Tour",
        tours: tours
    })
}