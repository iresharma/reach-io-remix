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
        prisma.board.findUnique({ where: { id: id }, include: { items: true } }).then(resolve).catch(reject);
    });
}
export const addItem = (data) => {
    return new Promise((resolve, reject) => {
        prisma.item.create({
            data: data,
        }).then(resolve).catch(reject)
    });
}
export const updatePrefix = (id, prefix) => {
    return new Promise((resolve, reject) => {
        prisma.item.update({ where: { id: id }, data: { prefix: prefix } }).then(resolve).catch(reject);
    })
}
export const updateItem = (data) => {
    return new Promise((resolve, reject) => {
        prisma.item.update({ where: { id: data.id }, data: data }).then(resolve).catch(reject);
    })
}