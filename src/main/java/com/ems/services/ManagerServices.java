package com.ems.services;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Location;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;

public class ManagerServices {

    public static void assignEmployeeToShift(final Employee pEmployee, final Shift pShift, final Organization pOrganization) throws SvcException {
        // Validate if the employee can be assigned to the shift
        if (!canAssignEmployeeToShift(pEmployee, pShift, pOrganization)) {
            throw new SvcException("Employee cannot be assigned to this shift.");
        }

        pEmployee.getAssignedShifts().add(pShift);
        pEmployee.setLoggedHours(pEmployee.getLoggedHours() + pShift.getDuration());

        notifyAssignment(pEmployee, pShift);

        updateShiftStatus(pShift);

        logAssignment(pEmployee, pShift);
    }

    public static boolean canAssignEmployeeToShift(final Employee pEmployee, final Shift pShift, final Organization pOrganization) {

        boolean employeeShiftLocationMatch = pEmployee.getLocationList().stream()
                .anyMatch(location -> location.getLocationId().equals(pShift.getLocationId()));

        boolean shiftLocationMatch = pOrganization.getLocationList().stream()
                .anyMatch(location -> location.getLocationId().equals(pShift.getLocationId()));

        boolean employeeOrgMatch = pEmployee.getOrganizationId().equals(pOrganization.getOrganizationId());

        boolean shiftIsOpen = pShift.isShiftOpen();

        boolean hoursUnderLimit = pEmployee.getLoggedHours() <=
                ((Location) pEmployee.getLocationList().stream()
                        .filter(location -> location.getLocationId().equals(pShift.getLocationId()))
                        .findFirst().get())
                        .getMaxHours();

        return employeeShiftLocationMatch && shiftLocationMatch && employeeOrgMatch && shiftIsOpen && hoursUnderLimit;
    }

    private static void notifyAssignment(Employee employee, Shift shift) {
        System.out.println("Notification: You have been assigned to shift " + shift.getShiftId());
    }

    private static void updateShiftStatus(Shift shift) {
        shift.setAvailableSlots(shift.getAvailableSlots() - 1);
    }

    private static void logAssignment(Employee employee, Shift shift) {
        System.out.println("Assignment logged: Employee " + employee.getEmployeeId() + " assigned to shift " + shift.getShiftId());
    }
}
