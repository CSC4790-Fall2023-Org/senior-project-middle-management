package com.ems.services; // Adjust the package name to match the tested class

import com.ems.Exceptions.SvcException;
import com.ems.Utils.EmployeeUtils;
import com.ems.Utils.OrganizationUtils;
import com.ems.Utils.ShiftUtils;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.*;

public class EmployeeServicesTests {

    private DatabaseServices databaseServices;
    private ValidationServices validationServices;
    private EmployeeServices employeeServices;

    @BeforeEach
    public void setUp() {
        databaseServices = mock(DatabaseServices.class);
        validationServices = mock(ValidationServices.class);
        employeeServices = new EmployeeServices(databaseServices, validationServices);
    }

    @Test
    public void testSetShiftToEmployeeUsingIDS() throws SvcException {
        Employee employee = EmployeeUtils.getBaseEmployee();
        Shift shift = ShiftUtils.getBaseShift();
        Organization organization = OrganizationUtils.getBaseOrganization();

        when(databaseServices.findEmployeeById(any())).thenReturn(java.util.Optional.of(employee));
        when(databaseServices.findShiftById(any())).thenReturn(java.util.Optional.of(shift));
        when(databaseServices.findOrganizationById(any())).thenReturn(java.util.Optional.of(organization));
        doNothing().when(validationServices).validateEmployeeCanConnectToShift(employee, shift, organization);

        Object[] result = employeeServices.assignShiftToEmployeeUsingIDS(employee, shift, organization);
        Employee resultEmployee = (Employee) result[0];

        assertEquals(List.of(employee.getShiftIdList().get(0), shift.getShiftId()), resultEmployee.getShiftIdList());
        assertFalse(shift.isShiftOpen());

        verify(validationServices, times(1)).validateEmployeeCanConnectToShift(employee, shift, organization);
        verify(databaseServices, times(1)).findEmployeeById(any());
        verify(databaseServices, times(1)).findShiftById(any());
        verify(databaseServices, times(1)).findOrganizationById(any());
    }
}
