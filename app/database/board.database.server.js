import { prisma } from "./index.database.server";

export const initializeKanban = (id) => {
    return new Promise((resolve, reject) => {
        prisma.board.create({
            data: {
                boards: [],
                items: [],
                userAccountId: id,
            }
        }).then(data => {
            prisma.UserAccount.update({
                where: { id: id },
                data: { boardId: data.id }
            }).then(resolve).catch(reject)
        }).catch(reject)
    });
}

export const getKanbanData = (id) => {
    return new Promise((resolve, reject) => {
        prisma.board.findUnique({ where: { id: id } }).then(resolve).catch(reject);
    });
}
export const addItem = (id, data) => {
    return new Promise((resolve, reject) => {
        prisma.board.update({
            where: { id: id }, data: {
                items: {
                    push: data
                }
            }
        }).then(resolve).catch(reject);
    });
}