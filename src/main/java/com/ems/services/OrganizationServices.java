package com.ems.services;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;

public class OrganizationServices {

    public static void addEmployeeToOrganization(final Employee employee, final Organization organization) throws SvcException {
        if (!canAddEmployeeToOrganization(employee, organization)) {
            throw new SvcException("Employee cannot be added to this organization.");
        }

        organization.getEmployeeList().add(employee);
        employee.setOrganizationId(organization.getOrganizationId());

        notifyAddition(employee, organization);

        logAddition(employee, organization);
    }

    public static boolean canAddEmployeeToOrganization(final Employee employee, final Organization organization) {
        // check if the employee and organization belong to the same location
        boolean employeeLocationMatch = organization.getLocationList().stream()
                .anyMatch(location -> employee.getLocationList().stream()
                        .anyMatch(employeeLocation -> employeeLocation.getLocationId().equals(location.getLocationId())));

        // check if the organization is active
        boolean organizationIsActive = organization.isActive();

        // check if the employee is not already part of another organization
        boolean isEmployeeNotInOtherOrg = employee.getOrganizationId() == null || employee.getOrganizationId().equals(organization.getOrganizationId());

        // check if the organization has available slots for employees
        boolean organizationHasAvailableSlots = organization.getEmployeeList().size() < organization.getMaxEmployees();

        // check if the employee type matches the organization's allowed types
        boolean isEmployeeTypeAllowed = organization.getAllowedEmployeeTypes().contains(employee.getEmployeeType());

        return employeeLocationMatch && organizationIsActive && isEmployeeNotInOtherOrg
                && organizationHasAvailableSlots && isEmployeeTypeAllowed;
    }

    private static void notifyAddition(Employee employee, Organization organization) {
        System.out.println("Notification: Employee " + employee.getEmployeeId() + " has been added to the organization " + organization.getOrganizationId());
    }

    private static void logAddition(Employee employee, Organization organization) {
        System.out.println("Addition logged: Employee " + employee.getEmployeeId() + " added to the organization " + organization.getOrganizationId());
    }
}
