import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";
import { generateTourCode } from "../../helpers/generate";
import systemConfig from "../../config/systemConfig";
import TourCategory from "../../models/tourCategory.model";

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
    res.render("admin/pages/tours/index",{
        pageTitle: "Tour",
        tours: tours
    })
}
export const create = async (req: Request, res: Response) => {
    const categories = await Category.findAll({
        raw: true,
        where: {
            deleted: false,
            status: "active"
        }
    });
    res.render("admin/pages/tours/create",{
        pageTitle: "Create",
        categories: categories
    })
}
export const createPost = async (req: Request, res: Response) => {
    const countTour = await Tour.count({});
    const code = generateTourCode(countTour+1);
    
    const dataTour = {
        title: req.body.title,
        code: code,
        price: parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        timeStart: req.body.timeStart,
        position: req.body.position=="" ? countTour+1 : req.body.position,
        status: req.body.status,
        images: JSON.stringify(req.body.images),
        information: req.body.information,
        schedule: req.body.schedule
    };
    const tour = await Tour.create(dataTour);

    const dataTourCategory = {
        tour_id: tour["id"],
        category_id: parseInt(req.body.category_id)
    };
    await TourCategory.create(dataTourCategory);
    res.redirect(`${systemConfig.PATH_ADMIN}/tours`);
}