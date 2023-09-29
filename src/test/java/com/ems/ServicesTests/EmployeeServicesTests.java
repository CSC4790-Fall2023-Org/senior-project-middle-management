package com.ems.ServicesTests;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.services.DatabaseServices;
import com.ems.services.EmployeeServices;
import com.ems.services.ValidationServices;

import org.bson.types.ObjectId;

public class EmployeeServicesTests {

    @Test
    public void testAssignShiftToEmployeeUsingIDS() throws Exception {

        ObjectId employeeId = new ObjectId();
        ObjectId shiftId = new ObjectId();
        Employee employee = new Employee();
        Shift shift = new Shift();
        Organization organization = new Organization();

        DatabaseServices databaseServices = Mockito.mock(DatabaseServices.class);
        ValidationServices validationServices = Mockito.mock(ValidationServices.class);

        Mockito.when(databaseServices.findEmployeeById(employeeId)).thenReturn(java.util.Optional.of(employee));
        Mockito.when(databaseServices.findShiftById(shiftId)).thenReturn(java.util.Optional.of(shift));
        Mockito.when(databaseServices.findOrganizationById(employee.getOrganizationId())).thenReturn(java.util.Optional.of(organization));

        EmployeeServices employeeServices = new EmployeeServices(databaseServices, validationServices);

        Object[] result = employeeServices.assignShiftToEmployeeUsingIDS(employeeId, shiftId);

        assertNotNull(result);
        assertEquals(employee, result[0]);
        assertEquals(shift, result[1]);
        assertFalse(shift.isShiftOpen());
    }
}
