package com.ems.services;

import com.ems.EmsApplication;
import com.ems.Exceptions.DatabaseException;
import com.ems.database.models.*;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public class DatabaseServices {

    // find employee by id
    public static Optional<Employee> findEmployeeById(ObjectId employeeId) {
        return EmsApplication.visibleEmployeeRepository
                .findAll()
                .stream()
                .filter(employee -> employee.getEmployeeId()
                        .equals(employeeId))
                .findFirst();
    }

    // find manager by id
    public static Optional<Manager> findManagerById(ObjectId managerId) {
        return EmsApplication.visibleManagerRepository
                .findAll()
                .stream()
                .filter(manager -> manager.getManagerId()
                        .equals(managerId))
                .findFirst();
    }

    // find organization by id
    public static Optional<Organization> findOrganizationById(ObjectId organizationId) {
        return EmsApplication.visibleOrganizationRepository
                .findAll()
                .stream()
                .filter(organization -> organization.getOrganizationId()
                        .equals(organizationId))
                .findFirst();
    }

    // find shift by id
    public static Optional<Shift> findShiftById(ObjectId shiftId) {
        return EmsApplication.visibleShiftRepository
                .findAll()
                .stream()
                .filter(shift -> shift.getShiftId()
                        .equals(shiftId))
                .findFirst();
    }

    // save employee
    public static void saveEmployee(Employee employee) throws DatabaseException {
        try {
            EmsApplication.visibleEmployeeRepository.save(employee);
        } catch (Exception e) {
            System.out.println("Error saving employee");
            throw new DatabaseException(DatabaseException.SAVING_EMPLOYEE, employee.getEmployeeId());
        }

    }

    // save manager
    public static void saveManager(Manager manager) throws DatabaseException {
        try{
            EmsApplication.visibleManagerRepository.save(manager);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new DatabaseException(DatabaseException.SAVING_MANAGER, manager.getManagerId());
        }
    }



    // save organization
    public static void saveOrganization(Organization organization) throws DatabaseException {
        try{
            EmsApplication.visibleOrganizationRepository.save(organization);
        }
        catch (Exception e){
            throw new DatabaseException(DatabaseException.SAVING_ORGANIZATION, organization.getOrganizationId());
        }

    }

    // save shift
    public static void saveShift(Shift shift) throws DatabaseException {
        try {
            EmsApplication.visibleShiftRepository.save(shift);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new DatabaseException(DatabaseException.SAVING_SHIFT, shift.getShiftId());
        }
    }

    // delete employee
    public static void deleteEmployee(Employee employee) throws DatabaseException {
        ObjectId employeeId = employee.getEmployeeId();
        if (EmsApplication.visibleEmployeeRepository.findAll().stream().noneMatch(em -> em.getEmployeeId().equals(employeeId))){
            throw new DatabaseException(DatabaseException.DELETING_EMPLOYEE, employeeId);
        }
        EmsApplication.visibleEmployeeRepository.delete(employee);
    }

    // delete manager
    public static void deleteManager(Manager manager) {
        ObjectId managerId = manager.getManagerId();
        if (EmsApplication.visibleManagerRepository.findAll().stream().noneMatch(ma -> ma.getManagerId().equals(managerId))){
            System.out.println("Manager not found");
            throw new RuntimeException("Error deleting manager! Manager with id: " + managerId + " is not present in the database");
        }
        EmsApplication.visibleManagerRepository.delete(manager);
    }

    // delete organization
    public static void deleteOrganization(Organization organization) {
        ObjectId organizationId = organization.getOrganizationId();
        if (EmsApplication.visibleOrganizationRepository.findAll().stream().anyMatch(or -> or.getOrganizationId().equals(organizationId))){
            System.out.println("Organization not found");
            throw new RuntimeException("Error deleting organization! Organization with id: " + organizationId + " is not present in the database");
        }
        EmsApplication.visibleOrganizationRepository.delete(organization);
    }

    // delete shift
    public static void deleteShift(Shift shift) {
        ObjectId shiftId = shift.getShiftId();
        if (EmsApplication.visibleShiftRepository.findAll().stream().anyMatch(sh -> sh.getShiftId().equals(shiftId))){
            System.out.println("Shift not found");
            throw new RuntimeException("Error deleting shift! Shift with id: " + shiftId + " is not present in the database");
        }
        EmsApplication.visibleShiftRepository.delete(shift);
    }

    public static List<Employee> getAllEmployees(){
        return EmsApplication.visibleEmployeeRepository.findAll();
    }

    public static List<Manager> getAllManagers() {
        return EmsApplication.visibleManagerRepository.findAll();
    }
    public static List<Organization> getAllOrganizations(){
        return EmsApplication.visibleOrganizationRepository.findAll();
    }
}
