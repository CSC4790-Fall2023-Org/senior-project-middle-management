package com.ems.Utils;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.services.DatabaseServices;
import com.ems.services.ValidationServices;
import org.bson.types.ObjectId;

import java.util.ArrayList;
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
                List.of(LocationUtils.getBaseLocation().getLocationId()),
                List.of(new ObjectId("6500e9ec491cac473a9b80cc")));
    }

    public static boolean doEmployeesMatch(final Employee pEmployee, final Employee pComparisonEmployee){
        return pEmployee.getFirstName().equals(pComparisonEmployee.getFirstName())
                && pEmployee.getLastName().equals(pComparisonEmployee.getLastName())
                && pEmployee.getEmployeeEmail().equals(pComparisonEmployee.getEmployeeEmail())
                && pEmployee.getEmployeePhoneNumber().equals(pComparisonEmployee.getEmployeePhoneNumber())
                && pEmployee.getEmployeeType().equals(pComparisonEmployee.getEmployeeType())
                && pEmployee.getLoggedHours() == pComparisonEmployee.getLoggedHours()
                && pEmployee.getPay() == pComparisonEmployee.getPay()
                && pEmployee.getOrganizationId().equals(pComparisonEmployee.getOrganizationId());
    }

    public static Object[] assignShiftToEmployeeUsingIDS(final ObjectId pEmployeeID, final ObjectId pShiftID) throws SvcException, DatabaseException {
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
        ValidationServices.validateEmployeeCanAcceptToShift(pEmployee, pShift, pOrganization);

        // adding the shift to the employee and changing its status
        List<ObjectId> resultList = new ArrayList<>(List.copyOf(pEmployee.getShiftIdList()));
        resultList.add(pShift.getShiftId());
        pEmployee.setShiftIdList(resultList);
        pShift.setShiftOpen(false);
        return new Object[]{pEmployee, pShift};
    }
}
