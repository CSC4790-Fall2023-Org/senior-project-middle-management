package com.ems.services;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.database.models.Location;

public class ShiftServices {

    public static void assignEmployeeToShift(final Employee employee, final Shift shift, final Organization organization) throws SvcException {
        if (!canAssignEmployeeToShift(employee, shift, organization)) {
            throw new SvcException("Employee cannot be assigned to this shift.");
        }

        employee.getShiftIdList().add(shift.getShiftId());
        employee.setLoggedHours(employee.getLoggedHours() + shift.getDuration());

        notifyAssignment(employee, shift);

        updateShiftStatus(shift);

        logAssignment(employee, shift);
    }

    public static boolean canAssignEmployeeToShift(final Employee employee, final Shift shift, final Organization organization) {

        boolean employeeLocationMatch = employee.getLocationList().stream()
                .anyMatch(location -> location.getLocationId().equals(shift.getLocationId()));

        boolean shiftLocationMatch = organization.getLocationList().stream()
                .anyMatch(location -> location.getLocationId().equals(shift.getLocationId()));

        boolean employeeOrgMatch = employee.getOrganizationId().equals(organization.getOrganizationId());

        boolean shiftIsOpen = shift.isShiftOpen();

        boolean hoursUnderLimit = employee.getLoggedHours() <=
                employee.getLocationList().stream()
                        .filter(location -> location.getLocationId().equals(shift.getLocationId()))
                        .findFirst()
                        .orElse(new Location())
                        .getMaxHours();

        return employeeLocationMatch && shiftLocationMatch && employeeOrgMatch && shiftIsOpen && hoursUnderLimit;
    }

    private static void notifyAssignment(Employee employee, Shift shift) {
        System.out.println("Notification: Employee " + employee.getEmployeeId() + " has been assigned to shift " + shift.getShiftId());
    }

    private static void updateShiftStatus(Shift shift) {
        shift.setAvailableSlots(shift.getAvailableSlots() - 1);
    }

    private static void logAssignment(Employee employee, Shift shift) {
        System.out.println("Assignment logged: Employee " + employee.getEmployeeId() + " assigned to shift " + shift.getShiftId());
    }
}
