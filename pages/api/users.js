import { fetchDataFromApi } from "../../libs/api";

export default async function (req, res) {

    const data = await fetchDataFromApi("api/users?populate=*")

    if(data) {
        res.status(200).json(data)

    }

    res.status(500).json({message: "No data"})
}