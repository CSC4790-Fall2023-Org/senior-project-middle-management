package com.ems.setup;

import com.ems.database.models.Employee;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class DemoEmployees {
    public static Employee DEMO_EMPLOYEE_ONE = new Employee(
            new ObjectId("651f3f35631f63367d896196"),
            "John",
            "Doe",
            "jdoe@gmail.com",
            "111-111-1111",
            "Guard",
            0,
            15.00,
            DemoOrganizations.DEMO_ORG_ONE.getOrganizationId(),
            List.of(DemoOrganizations.DEMO_ORG_ONE.getLocationList().get(0).getLocationId()),
            new ArrayList<>());

    public static List<Employee> createDemoEmployeeList(){
        return List.of(DEMO_EMPLOYEE_ONE);
    }
}
