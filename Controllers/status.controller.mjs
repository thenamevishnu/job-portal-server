const status = async (req, res) => {
    try {
        return res.status(200).send({ message: "up time"})
    } catch (err) {
        return res.status(500).send({message: "down"})
    }
}

export default { status }