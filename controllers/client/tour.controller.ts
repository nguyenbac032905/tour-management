import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";
import { Request, Response } from "express";
import Tour from "../../models/tour.model";

export const index = async (req: Request, res: Response) => {
    const slugCategory = req.params.slugCategory;
    const tours = await sequelize.query(`
        SELECT tours.*, ROUND((1-discount/100)*price,0) AS specialPrice 
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON categories.id = tours_categories.category_id
        WHERE tours.status = "active" AND tours.deleted = false
            AND categories.status = "active" AND categories.deleted = false
            AND categories.slug = "${slugCategory}"
    `,{
        type: QueryTypes.SELECT
    });
    tours.forEach(tour => {
        if(tour["images"]){
            tour["image"] = JSON.parse(tour["images"])[0];
        }
        tour["specialPrice"] = parseFloat(tour["specialPrice"]);
    })
    res.render("client/pages/tours/index",{
        tours: tours,
        pageTitle: "Tours"
    });
}
export const detail = async (req: Request,res: Response) => {
    const slugTour = req.params.slugTour;
    const tourDetail = await Tour.findOne({
        raw: true,
        where: {
            deleted: false,
            status: "active",
            slug: slugTour
        }
    });
    tourDetail["images"] = JSON.parse(tourDetail["images"]);
    tourDetail["priceSpecial"] = (1-tourDetail["discount"]/100)* tourDetail["price"];
    res.render("client/pages/tours/detail",{
        pageTitle: "Detail",
        tourDetail: tourDetail
    })
}