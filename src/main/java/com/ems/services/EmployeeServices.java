package com.ems.services;
import ch.qos.logback.core.joran.sanity.Pair;
import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;

import java.security.KeyPair;
import java.util.ArrayList;
import java.util.List;

public class EmployeeServices {
    public static Object[] setShiftToEmployeeUsingIDS(final ObjectId pEmployeeID, final ObjectId pShiftID) throws SvcException {
        // create necessary objects using IDs
        Employee employee = DatabaseServices.findEmployeeById(pEmployeeID)
                .orElseThrow(() -> new SvcException("error"));
        Shift shift = DatabaseServices.findShiftById(pShiftID)
                .orElseThrow(() -> new SvcException("error"));
        Organization organization = DatabaseServices.findOrganizationById(employee.getOrganizationId())
                .orElseThrow(() -> new SvcException("error"));

        // validation
        ValidationServices.validateEmployeeCanConnectToShift(employee, shift, organization);

        // adding the shift to the employee and changing its status
        employee.getShiftIdList().add(shift.getShiftId());
        shift.setShiftOpen(false);
        return new Object[]{employee, shift};
    }

}
