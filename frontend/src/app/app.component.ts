import { Component } from "@angular/core";
import { Employee } from "./models/employee";
import { EmployeesService } from "./services/employees.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  employees: Employee[] = [];
  employeeForm: FormGroup;
  selectedEmployee: Employee = new Employee();
  employeesQuantity: number = 0;

  constructor(private employesService: EmployeesService, private _builder: FormBuilder) {
    this.employesService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.employeesQuantity = data.length;
    });

    this.employeeForm = this._builder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      avatar: ["", Validators.required],
    });
  }

  _blankControls() {
    this.employeeForm.get("first_name").reset();
    this.employeeForm.get("last_name").reset();
    this.employeeForm.get("email").reset();
    this.employeeForm.get("avatar").reset();
  }

  manageSubmit(values: Employee) {
    if (this.selectedEmployee._id === undefined) {
      this.employesService.addEmployee(values).subscribe((data) => {
        return this.employees.push(data);
      });
      this.employeesQuantity = this.employeesQuantity + 1;
      Swal.fire({
        title: "Saved!",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } else {
      this.employesService.editEmployee(this.selectedEmployee._id, values);

      const index = this.employees.findIndex(
        (employee) => employee._id === this.selectedEmployee._id
      );
      this.employees[index].first_name = this.employeeForm.get("first_name").value;
      this.employees[index].last_name = this.employeeForm.get("last_name").value;
      this.employees[index].email = this.employeeForm.get("email").value;
      this.employees[index].avatar = this.employeeForm.get("avatar").value;
      Swal.fire({
        title: "Edited!",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }
    this.selectedEmployee = new Employee();
    this._blankControls();
  }

  deleteEmployee(id: string) {
    Swal.fire({
      title: "Delete the employee?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.employesService.deleteEmployee(id);
        this.employees = this.employees.filter((employee) => employee._id !== id);
        this.employeesQuantity = this.employeesQuantity - 1;
        Swal.fire("Deleted!", "The employee has been deleted.", "success");
      }
    });
  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.employeeForm.get("first_name").setValue(this.selectedEmployee.first_name);
    this.employeeForm.get("last_name").setValue(this.selectedEmployee.last_name);
    this.employeeForm.get("email").setValue(this.selectedEmployee.email);
    this.employeeForm.get("avatar").setValue(this.selectedEmployee.avatar);
  }
}
