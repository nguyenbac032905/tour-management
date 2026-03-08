import Tour from "../../models/tour.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
    const tours = await Tour.findAll({raw: true});
    console.log(tours)
    res.render("client/pages/tours/index",{
        tours: tours
    });
}