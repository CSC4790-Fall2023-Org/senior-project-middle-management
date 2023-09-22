package com.ems.ServicesTests;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.EmployeeUtils;
import com.ems.Utils.OrganizationUtils;
import com.ems.Utils.ShiftUtils;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.services.EmployeeServices;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;

public class EmployeeServicesTests {
    @Test
    public void testSetShiftToEmployeeUsingIDS() throws SvcException {
        Employee employee = EmployeeUtils.getBaseEmployee();
        Shift shift = ShiftUtils.getBaseShift();
        Organization organization = OrganizationUtils.getBaseOrganization();

        {
            // valid employee, shift, and org
            Object[] result = EmployeeServices.assignShiftToEmployeeUsingIDS(employee,shift,organization);
            Employee resultEmployee = (Employee) result[0];
            assertEquals(List.of(employee.getShiftIdList().get(0), shift.getShiftId()), resultEmployee.getShiftIdList());
            assertFalse(shift.isShiftOpen());
        }
    }
}
