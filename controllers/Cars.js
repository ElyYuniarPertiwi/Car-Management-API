import Cars from "../models/CarsModel.js";
import jwt from "jsonwebtoken";

export const getCars = async(req, res) => {
    if (req.body.role == "member") {
        res.status(401).json({
            status: "Unauthorized",
            message: "Anda tidak terdaftar sebagai superadmin/admin",
        });
        return;
    }
    try {
        const cars = await Cars.findAll({
            attributes:['id','name','price','size','photo', 'userId']
        });
        res.json(cars);
    } catch (error) {
        console.log(error);
    }
}

export const getCarById = async(req, res) => {
    if (req.body.role == "member") {
        res.status(401).json({
            status: "Unauthorized",
            message: "Anda tidak terdaftar sebagai superadmin/admin",
        });
        return;
    }
    try {
        const { id } = req.params;
        const cars = await Cars.findOne({
            where:{ id: id },
        });
        res.json(cars);
    } catch (error) {
        console.log(error);
    }
}

export const createCars = async(req, res) => {
    if (req.body.role == "member") {
        res.status(401).json({
            status: "Unauthorized",
            message: "Anda tidak terdaftar sebagai superadmin/admin",
        });
        return;
    }
    const { name, price, size, photo, userId } = req.body;
    try {
        await Cars.create({
            name: name,
            price: price,
            size: size,
            photo: photo,
            userId: userId
        });
        return res.status(200).json({
            success: true,
            message: "Data Berhasil Disimpan",
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCars = async(req, res) => {
    if (req.body.role == "member") {
        res.status(401).json({
            status: "Unauthorized",
            message: "Anda tidak terdaftar sebagai superadmin/admin",
        });
        return;
    }
    const { id } = req.params;
    const { name, price, size, photo } = req.body;
    try {
        await Cars.update({
            name: name,
            price: price,
            size: size,
            photo: photo },
            {where: { id: id},
        });
        return res.status(200).json({
            success: true,
            message: "Data Berhasil Diubah",
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteCars = async(req, res) => {
    if (req.body.role == "member") {
        res.status(401).json({
            status: "Unauthorized",
            message: "Anda tidak terdaftar sebagai superadmin/admin",
        });
        return;
    }
    try {
        const { id } = req.params;
        const dataBeforeDelete = await Cars.findOne({
            where: { id: id },
        })
        
        const parsedDataCar = JSON.parse(JSON.stringify(dataBeforeDelete));

        if (!parsedDataCar){
            return res.status(400).json({
                success:false,
                message: "Cars doesn't exist or has been deleted",
            })
        }

        await Cars.destroy({
            where: { id },
        });

        return res.status(200).json({
            success: true,
            message: "Delete Data Berhasil",
        })
    } catch (error) {
        console.log(error);
    }
}