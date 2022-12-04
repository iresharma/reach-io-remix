import { redirect } from "@remix-run/node"
import { updatePrefix, updateItem } from "../../database/board.database.server"

export const loader = () => redirect('/board')

export const action = async ({ request }) => {
    switch (request.method) {
        case 'PATCH': {
            const formData = await request.json();
            await updatePrefix(formData.id, formData.prefix);
            return {}
        }
        case 'PUT': {
            const formData = await request.json();
            await updateItem(formData);
            return {}
        }
    }
}