package com.ems.services;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.EmployeeUtils;
import com.ems.database.models.Employee;
import com.ems.database.models.Location;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

public class ValidationServices {

    public static void validateEmployeeCanConnectToShift(final Employee pEmployee, final Shift pShift, final Organization pOrganization) throws SvcException {
        // employee and shift belong to same location
        if (pEmployee.getLocationList().stream().noneMatch(location -> location.getLocationId().equals(pShift.getLocationId()))) {
            throw new SvcException("error");
        }

        // shift belongs to same org
        if(pOrganization.getLocationList().stream().noneMatch(location -> location.getLocationId().equals(pShift.getLocationId()))){
            throw new SvcException("error");
        }

        // employee belongs to org
        if (!pEmployee.getOrganizationId().equals(pOrganization.getOrganizationId())){
            throw new SvcException("error");
        }
        // shift is open
        if (!pShift.isShiftOpen()){
            throw new SvcException("error");
        }

        // employees current hours is less than locations limit
        if (pEmployee.getLoggedHours() >
                pEmployee.getLocationList().stream()
                        .filter(location -> location.getLocationId().equals(pShift.getLocationId())).findFirst().get()
                        .getMaxHours()){
            throw new SvcException("error");
        }
    }

    public static void validateCreateEmployee(final Employee pEmployee) throws SvcException {
        // employee already in database
        if (DatabaseServices.getAllEmployees().stream().anyMatch(e -> EmployeeUtils.doEmployeesMatch(e, pEmployee))){
            throw new SvcException("error");
        }




    }
}
