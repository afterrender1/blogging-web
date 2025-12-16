import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../lib/token.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ success: false, message: "User already exists" });

        if (!username || !email || !password)
            return res.status(400).json({ success: false, message: "All fields required!" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });
        res.status(201).json({
            message: "signup successfull",
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role

            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Signup error" });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({
            success: false,
            message: "user not exists"
        })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({
            success: false,
            message: "email or password is incorrect"
        })

        const token = genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });
        res.status(200).json(user)


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "signup error"
        })


    }




}

export const signout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/"
        });

        res.status(200).json({
            success: true,
            message: "logout successfull"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "srever error"
        })

    }


}



export const me = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({
            success: false,
            message: "user not logged in!"
        })

        const decoded = jwt.verify(token, process.env.JWT_SCERET)

        const user = await User.findById(decoded.userId).select("-password")
        res.status(200).json({
            success: true,
            user
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }

}

