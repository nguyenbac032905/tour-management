import { Request,Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/orderItem.model";

export const index = async (req: Request,res: Response) => {
    const data=req.body;

    const dataOrder = {
        code: "",
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: "initial"
    };

    const order = await Order.create(dataOrder);
    const orderId = order.dataValues.id;

    const code = generateOrderCode(orderId);

    await order.update({
        code: code
    },{
        where: {
            id: orderId
        }
    });

    for(const item of data.cart){
        const dataItem = {
            order_id: orderId,
            tour_id: item.tourId,
            quantity: item.quantity
        };
        const tourInfo = await Tour.findOne({
            raw: true,
            where: {
                id: item.tourId,
                deleted: false,
                status: "active"
            }
        });
        dataItem["discount"] = tourInfo["discount"];
        dataItem["price"] = tourInfo["price"];
        dataItem["timeStart"] = tourInfo["timeStart"];
        const orderItem = await OrderItem.create(dataItem);
    }
    res.send({
        code: 200,
        message: "Dat hang thanh cong",
        orderCode: code
    })
}
export const success = async (req: Request, res: Response) => {
    const orderCode = req.query.ordercode;

    const order = await Order.findOne({
        raw: true,
        where: {
            deleted: false,
            code: orderCode
        }
    });
    const orderItems = await OrderItem.findAll({
        raw: true,
        where: {
            order_id: order["id"]
        }
    });
    for(const item of orderItems){
        item["priceSpecial"] = item["price"]*(1-item["discount"]/100);
        item["total"] = item["priceSpecial"]*item["quantity"];
        const tourInfo = await Tour.findOne({
            raw: true,
            where: {
                id: item["tour_id"]
            }
        });
        item["title"] = tourInfo["title"];
        item["slug"] = tourInfo["slug"];
        item["image"] = JSON.parse(tourInfo["images"])[0];
    }
    order["total"] = orderItems.reduce((sum,item) => sum+item["total"],0);
    res.render("client/pages/order/success",{
        pageTitle: "Success",
        order: order,
        orderItem: orderItems
    })
}