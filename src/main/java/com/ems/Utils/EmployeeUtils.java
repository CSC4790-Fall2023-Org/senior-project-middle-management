package com.ems.Utils;

import com.ems.database.models.Employee;
import com.ems.database.models.Location;
import org.bson.types.ObjectId;

import java.util.List;

public class EmployeeUtils {

    public static Employee getBaseEmployee(){
        return new Employee(
                new ObjectId("6500e9cc491cac473a9b80cb"),
                "employee",
                "admin",
                "eadmin@gmail.com",
                "111-111-1111",
                "Guard",
                20,
                12.50,
                new ObjectId("6500cf35491cac473a9b80c8"),
                List.of(LocationUtils.getBaseLocation()),
                List.of(new ObjectId("6500e9ec491cac473a9b80cc")));
    }
}
