import { Component } from "@angular/core";
import { Employee } from "./models/employee";
import { EmployeesService } from "./services/employees.service";
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  employees: Employee[] = [];

  constructor(private employesService: EmployeesService) {
    this.employesService.getEmployees().subscribe((data) => (this.employees = data));
  }

  selectedEmployee: Employee = new Employee();

  manageSubmit(employee: Employee) {
    if (employee._id === undefined) {
      this.employesService.addEmployee(employee).subscribe((data) => {
        return this.employees.push(data);
      });
    } else {
      this.employesService.editEmployee(employee._id, employee);
    }
    this.selectedEmployee = new Employee();
  }

  deleteEmployee(id: string) {
    this.employesService.deleteEmployee(id);
    this.employees = this.employees.filter((employee) => employee._id !== id);
  }
  editEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }
}
