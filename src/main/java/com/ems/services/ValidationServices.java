package com.ems.services;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.EmployeeUtils;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.database.models.Manager;


public class ValidationServices {

    public static void validateEmployeeCanAcceptToShift(final Employee pEmployee, final Shift pShift, final Organization pOrganization, final Manager pManager) throws SvcException {
        // employee and shift belong to the same location
        if (pEmployee.getLocationList().stream().noneMatch(location -> location.getLocationId().equals(pShift.getLocationId()))) {
            throw new SvcException("Employee does not belong to the same location as the shift.");
        }

        // shift belongs to the same organization
        if (!pOrganization.getOrganizationId().equals(pShift.getOrganizationId())) {
            throw new SvcException("Shift does not belong to the same organization.");
        }

        // employee belongs to org
        if (!pEmployee.getOrganizationId().equals(pOrganization.getOrganizationId())) {
            throw new SvcException("Employee does not belong to the same organization.");
        }

        // shift is open
        if (!pShift.isShiftOpen()) {
            throw new SvcException("Shift is not open.");
        }

        // Check if the shift has reached its maximum capacity
        if (pShift.getCapacity() <= pShift.getAttendingEmployees().size()) {
            throw new SvcException("Shift has reached maximum capacity.");
        }

        // check if the employee is already assigned to another shift at the same time
        if (pEmployee.getAssignedShifts().stream().anyMatch(shift -> shift.getStartTime().equals(pShift.getStartTime()) && shift.getEndTime().equals(pShift.getEndTime()))) {
            throw new SvcException("Employee is already assigned to another shift at the same time.");
        }
        if (isManagerInDatabase(pManager)) {
            throw new SvcException("Manager is already in the database.");
        }

    }

    private static boolean isManagerInDatabase(final Manager pManager) {
        // Return true if the manager is in the database, false otherwise
        return false;
    }
}
