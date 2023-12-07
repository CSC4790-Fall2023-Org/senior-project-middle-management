package com.ems.setup;

import com.ems.database.models.Employee;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class DemoEmployees {
    public static Employee DEMO_EMPLOYEE_ONE = new Employee(
            new ObjectId("651f3f35631f63367d896196"),
            "Employee",
            "One",
            "eOne@gmail.com",
            "111-111-1111",
            "Guard",
            0,
            15.00,
            DemoOrganizations.DEMO_ORG_ONE.getOrganizationId(),
            List.of(DemoOrganizations.DEMO_ORG_ONE.getLocationList().get(0).getLocationId()),
            new ArrayList<>());

    public static Employee DEMO_EMPLOYEE_TWO = new Employee(
            new ObjectId("653d70c730cd4ad7a58ee7fa"),
            "Employee",
            "Two",
            "eTwo@gmail.com",
            "111-111-1111",
            "Guard",
            0,
            15.00,
            DemoOrganizations.DEMO_ORG_ONE.getOrganizationId(),
            List.of(DemoOrganizations.DEMO_ORG_ONE.getLocationList().get(0).getLocationId()),
            new ArrayList<>());

    public static Employee DEMO_EMPLOYEE_THREE = new Employee(
            new ObjectId("653d70c730cd4ad7a58ee7fd"),
            "Employee",
            "Three",
            "eThree@gmail.com",
            "111-111-1111",
            "Guard",
            0,
            15.00,
            DemoOrganizations.DEMO_ORG_ONE.getOrganizationId(),
            List.of(DemoOrganizations.DEMO_ORG_ONE.getLocationList().get(0).getLocationId()),
            new ArrayList<>());


    public static List<Employee> createDemoEmployeeList(){
        return List.of(DEMO_EMPLOYEE_ONE, DEMO_EMPLOYEE_TWO, DEMO_EMPLOYEE_THREE);
    }
}
