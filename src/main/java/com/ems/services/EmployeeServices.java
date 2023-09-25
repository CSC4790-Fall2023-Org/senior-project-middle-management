package com.ems.services;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;

import java.util.List;

public class EmployeeServices {

    private final DatabaseServices databaseServices;
    private final ValidationServices validationServices;

    public EmployeeServices(DatabaseServices databaseServices, ValidationServices validationServices) {
        this.databaseServices = databaseServices;
        this.validationServices = validationServices;
    }

    public Object[] assignShiftToEmployeeUsingIDS(ObjectId pEmployeeID, ObjectId pShiftID)
            throws SvcException, DatabaseException {
        Employee employee = findEmployeeById(pEmployeeID);
        Shift shift = findShiftById(pShiftID);
        Organization organization = findOrganizationById(employee.getOrganizationId());
        return assignShiftToEmployeeUsingIDS(employee, shift, organization);
    }

    private Employee findEmployeeById(ObjectId employeeID) throws DatabaseException {
        return databaseServices.findEmployeeById(employeeID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_EMPLOYEE, employeeID));
    }

    private Shift findShiftById(ObjectId shiftID) throws DatabaseException {
        return databaseServices.findShiftById(shiftID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_SHIFT, shiftID));
    }

    private Organization findOrganizationById(ObjectId organizationID) throws DatabaseException {
        return databaseServices.findOrganizationById(organizationID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, organizationID));
    }

    public Object[] assignShiftToEmployeeUsingIDS(Employee pEmployee, Shift pShift, Organization pOrganization)
            throws SvcException {
        validationServices.validateEmployeeCanConnectToShift(pEmployee, pShift, pOrganization);
        List<ObjectId> resultList = pEmployee.getShiftIdList();
        resultList.add(pShift.getShiftId());
        pEmployee.setShiftIdList(resultList);
        pShift.setShiftOpen(false);
        return new Object[]{pEmployee, pShift};
    }
}
