import { prisma } from "./index.database.server";

export const initializePage = ({ account_name, id }) => {
  return new Promise((resolve, reject) => {
    prisma.page
      .create({
        data: {
          route: `/${account_name}`,
          template: {},
          userAccountId: id,
        },
      })
      .then((data) => {
        prisma.UserAccount.update({
          where: { id: id },
          data: { pageId: data.id },
        })
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

export const getPageData = (id) => {
  return new Promise((resolve, reject) => {
    prisma.page
      .findUnique({ where: { id: id } })
      .then(resolve)
      .catch(reject);
  });
};

export const updatePageLinks = (id, data) => {
  return new Promise((resolve, reject) => {
    prisma.page
      .update({ where: { id: id }, data: { links: data } })
      .then(resolve)
      .catch(reject);
  });
};

export const updatePageTemplete = (id, data) => {
  return new Promise((resolve, reject) => {
    prisma.page
      .update({ where: { id: id }, data: { template: data } })
      .then(resolve)
      .catch(reject);
  });
};
