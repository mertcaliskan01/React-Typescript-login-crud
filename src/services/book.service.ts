import http from "../http-common";
import IBookData from "../types/book.type"
import authHeader from './auth-header';

class BookDataService {
  getAll() {
    return http.get<Array<IBookData>>("/book", { headers: authHeader() });
  }

  get(id: string) {
    return http.get<IBookData>(`/book/${id}`, { headers: authHeader() });
  }

  create(data: IBookData) {
    return http.post<IBookData>("/book", data, { headers: authHeader() });
  }

  update(data: IBookData, id: any) {
    return http.put<any>(`/book/${id}`, data, { headers: authHeader() });
  }

  delete(id: any) {
    return http.delete<any>(`/book/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete<any>(`/book`, { headers: authHeader() });
  }

  findByTitle(title: string) {
    return http.get<Array<IBookData>>(`/book?title=${title}`, { headers: authHeader() });
  }
}

export default new BookDataService();