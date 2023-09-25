package com.ems.services;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;

import java.util.List;

public class EmployeeServices {

    public static Object[] assignShiftToEmployeeUsingIDS(ObjectId pEmployeeID, ObjectId pShiftID) throws SvcException, DatabaseException {
        Employee employee = findEmployeeById(pEmployeeID);
        Shift shift = findShiftById(pShiftID);
        Organization organization = findOrganizationById(employee.getOrganizationId());
        return assignShiftToEmployeeUsingIDS(employee, shift, organization);
    }

    private static Employee findEmployeeById(ObjectId employeeID) throws DatabaseException {
        return DatabaseServices.findEmployeeById(employeeID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_EMPLOYEE, employeeID));
    }

    private static Shift findShiftById(ObjectId shiftID) throws DatabaseException {
        return DatabaseServices.findShiftById(shiftID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_SHIFT, shiftID));
    }

    private static Organization findOrganizationById(ObjectId organizationID) throws DatabaseException {
        return DatabaseServices.findOrganizationById(organizationID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, organizationID));
    }

    public static Object[] assignShiftToEmployeeUsingIDS(Employee pEmployee, Shift pShift, Organization pOrganization) throws SvcException {
        ValidationServices.validateEmployeeCanConnectToShift(pEmployee, pShift, pOrganization);
        List<ObjectId> resultList = pEmployee.getShiftIdList();
        resultList.add(pShift.getShiftId());
        pEmployee.setShiftIdList(resultList);
        pShift.setShiftOpen(false);
        return new Object[]{pEmployee, pShift};
    }
}
