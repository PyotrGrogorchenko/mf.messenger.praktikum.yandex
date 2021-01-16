var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { env } from "../const/index.js";
import { HTTPTransport } from "./HTTPTransport.js";
export const xhrPostCreateChat = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new HTTPTransport();
        const req = yield httpTransport.post(`${env.URL_REQUEST}/chats`, { withCredentials: true,
            headers: { 'content-type': 'application/json' },
            data
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
export const xhrGetChats = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new HTTPTransport();
        const req = yield httpTransport.get(`${env.URL_REQUEST}/chats`, { withCredentials: true,
            headers: { 'content-type': 'application/json' }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
export const xhrPostUsersSearh = (searchString) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new HTTPTransport();
        const req = yield httpTransport.post(`${env.URL_REQUEST}/user/search`, {
            withCredentials: true,
            headers: { 'content-type': 'application/json' },
            data: { login: searchString }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
export const xhrGetAuthUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new HTTPTransport();
        const req = yield httpTransport.get(`${env.URL_REQUEST}/auth/user`, {
            withCredentials: true,
            headers: { 'content-type': 'application/json' }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
export const xhrPostAuthSignUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new HTTPTransport();
        const req = yield httpTransport.post(`${env.URL_REQUEST}/auth/signup`, {
            data,
            withCredentials: true,
            headers: { 'content-type': 'application/json' }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
export const xhrPostAuthSignin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new HTTPTransport();
        const req = yield httpTransport.post(`${env.URL_REQUEST}/auth/signin`, {
            withCredentials: true,
            headers: { 'content-type': 'application/json' },
            data
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
export const xhrPostLogout = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new HTTPTransport();
        const req = yield httpTransport.post(`${env.URL_REQUEST}/auth/logout`, {
            withCredentials: true,
            headers: { 'content-type': 'application/json'
            }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
export const xhrOnError = (error = null) => {
    console.error('xhrExecute:' + error);
};
//# sourceMappingURL=xhrExecute.js.map