import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "../models/employee";

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  API_URL: string = "http://localhost:3000/api/";

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>(this.API_URL);
  }

  getEmployee(id: string) {
    return this.http.get<Employee>(this.API_URL + `${id}`);
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>(this.API_URL, employee);
  }

  editEmployee(id: string, employee: Employee) {
    return this.http.put<Employee>(this.API_URL + `${id}`, employee).subscribe();
  }

  deleteEmployee(id: string) {
    return this.http.delete<Employee>(this.API_URL + `${id}`).subscribe();
  }
}
