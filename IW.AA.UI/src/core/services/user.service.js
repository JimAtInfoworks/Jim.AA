import { Config } from "../utils/config";
import { fetchWrapper } from "../helpers";

const baseUrl = `${Config.apiUrl}/users`;

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(userId) {
  return fetchWrapper.get(`${baseUrl}/${userId}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(userId, params) {
  return fetchWrapper.put(`${baseUrl}/${userId}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(userId) {
  return fetchWrapper.delete(`${baseUrl}/${userId}`);
}

