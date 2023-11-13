package com.ems.UtilsTests;

import com.ems.TestFactory.ModelTestFactory;
import com.ems.database.models.Employee;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class EmployeeUtilsTests {
    @Test
    public void testUpdateEmployee() throws JSONException {
        final Employee baseEmployee = ModelTestFactory.getEmployee();
        {
            // update first name to "new first name"
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("firstName", "new first name");

            final Employee updatedEmployee = com.ems.Utils.EmployeeUtils.updateEmployee(baseEmployee, jsonObject);
            assertEquals(updatedEmployee.getFirstName(),"new first name");
        }
        {
            // update first name to "new first name" and last name to "new last name"
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("firstName", "new first name");
            jsonObject.put("lastName", "new last name");

            final Employee updatedEmployee = com.ems.Utils.EmployeeUtils.updateEmployee(baseEmployee, jsonObject);
            assertEquals(updatedEmployee.getFirstName(),"new first name");
            assertEquals(updatedEmployee.getLastName(),"new last name");
        }
    }
}
