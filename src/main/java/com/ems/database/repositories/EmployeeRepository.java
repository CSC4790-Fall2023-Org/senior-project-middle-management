package com.ems.database.repositories;

import com.ems.database.models.Employee;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

@Document(collection = "employees")
public interface EmployeeRepository extends MongoRepository<Employee, String> {

}
