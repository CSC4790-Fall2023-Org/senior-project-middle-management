package com.ems.services;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.EmployeeUtils;
import com.ems.Utils.ManagerUtils;
import com.ems.database.models.*;
import org.bson.types.ObjectId;

import java.util.List;

public class ValidationServices {

    public static void validateEmployeeCanAcceptToShift(final Employee pEmployee, final Shift pShift, final Organization pOrganization) throws SvcException {
        // employee and shift belong to same location
        if (pEmployee.getLocationIdList().stream().noneMatch(location -> location.equals(pShift.getLocationId()))) {
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
        Location location = pOrganization.getLocationList().stream()
                .filter(l -> l.getLocationId().equals(pShift.getLocationId()))
                .findFirst().get();

        if (pEmployee.getLoggedHours() >
                location.getMaxHours()){
            throw new SvcException("error");
        }
    }

    public static void validateManagerCanJoinOrganization(final Manager pManager, final Organization pOrganization) throws SvcException {
        // extract the org ID to compare with manager's org
        ObjectId targetLocationId = pOrganization.getOrganizationId();

        // collect the location IDs from the org's location list
        List<ObjectId> locationIds = pOrganization.getLocationList().stream()
                .map(Location::getLocationId)
                .toList();

        // check if manager's org matches any of the org's locations
        boolean matchingLocation = locationIds.contains(targetLocationId);

        // if no matching location is found, throw an error.
        if (!matchingLocation) {
            throw new SvcException("error");
        }
        //check if the manager's organization matches the provided organization
        if (!pManager.getOrganizationId().equals(pOrganization.getOrganizationId())) {
            throw new SvcException("error");
        }
        //check if the manager is not already assigned to another organization
        if (pManager.getOrganizationId()!= null) {
            throw new SvcException("error");
        }
    }

    public static void validateCreateEmployee(final Employee pEmployee) throws SvcException {
        // employee already in database
        if (DatabaseServices.getAllEmployees().stream().anyMatch(e -> EmployeeUtils.doEmployeesMatch(e, pEmployee))){
            throw new SvcException("error");
        }
    }

    public static void validateCreateManager(final Manager pManager) throws SvcException {
        // manager is already in the database
        if (DatabaseServices.getAllManagers().stream().anyMatch(e -> ManagerUtils.doManagersMatch(e, pManager))) {
            throw new SvcException("error");
        }
    }

    public static void validateDeleteEmployee(Employee pEmployee) throws SvcException {
        if (DatabaseServices.getAllEmployees().stream().noneMatch(e -> EmployeeUtils.doEmployeesMatch(e, pEmployee))){
            throw new SvcException("error");
        }
    }

    public static void validateDeleteManager(Manager pManager) throws SvcException {
        if (DatabaseServices.getAllManagers().stream().noneMatch(e -> ManagerUtils.doManagersMatch(e, pManager))) {
            throw new SvcException("error");
        }
    }

    public static void validateCreateShift(final Shift pShift){

    }
}
