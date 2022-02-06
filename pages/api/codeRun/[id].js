import {getCodeRunPreview} from "../../../request/modules/utilRequest";

export default async function handler(req, res) {
    const id = req.query.id
    const html = await getCodeRunPreview(id)
    console.log(html)
    res.send(html)
}