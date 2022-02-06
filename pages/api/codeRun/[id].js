import {getCodeRunPreview} from "../../../request/modules/utilRequest";

export default async function handler(req, res) {
    const id = req.query.id
    const html = await getCodeRunPreview(id)
    res.send(html)
}