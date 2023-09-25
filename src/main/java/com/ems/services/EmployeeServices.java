package com.ems.services;
import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class EmployeeServices {
    public static Object[] assignShiftToEmployeeUsingIDS(final ObjectId pEmployeeID, final ObjectId pShiftID) throws SvcException, DatabaseException{
        // create necessary objects using IDs
        Employee employee = DatabaseServices.findEmployeeById(pEmployeeID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_EMPLOYEE, pEmployeeID));
        Shift shift = DatabaseServices.findShiftById(pShiftID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_SHIFT, pShiftID));
        Organization organization = DatabaseServices.findOrganizationById(employee.getOrganizationId())
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, employee.getOrganizationId()));

        return assignShiftToEmployeeUsingIDS(employee, shift, organization);
    }

    public static Object[] assignShiftToEmployeeUsingIDS(final Employee pEmployee, final Shift pShift, final Organization pOrganization) throws SvcException {
        // validation
        ValidationServices.validateEmployeeCanConnectToShift(pEmployee, pShift, pOrganization);

        // adding the shift to the employee and changing its status
        List<ObjectId> resultList = new ArrayList<>(List.copyOf(pEmployee.getShiftIdList()));
        resultList.add(pShift.getShiftId());
        pEmployee.setShiftIdList(resultList);
        pShift.setShiftOpen(false);
        return new Object[]{pEmployee, pShift};
    }

}
