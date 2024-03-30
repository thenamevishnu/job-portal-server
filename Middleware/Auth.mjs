import jwt from "jsonwebtoken"

export const Auth = async (req, res, next) => {
    try{
        const token = req.headers["authorization"]
        if(token.split(" ")[1] == "null"){
            return res.status(401).send({ message: "Please login to access" })
        }else{
            const auth = jwt.verify(token?.split(" ")[1],process.env.JWT_KEY)
            const now = Math.floor(new Date().getTime() / 1000)
            if(auth.exp <= now){
                return res.status(401).send({ message: "Please login to access" })
            }else{
                next()
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "internal server error" })
    }
}
