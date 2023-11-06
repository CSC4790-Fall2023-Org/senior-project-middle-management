package com.ems.Utils;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Manager;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.services.DatabaseServices;
import org.bson.types.ObjectId;

import javax.xml.crypto.Data;
import java.util.List;

public class DatabaseUtils {

    public static boolean locationExists(final ObjectId pLocationId){
        if (DatabaseServices.getAllOrganizations()
                .stream()
                .anyMatch(organization ->
                        organization.getLocationList()
                        .stream()
                        .anyMatch(location ->
                                location.getLocationId().equals(pLocationId)))){
            return true;
        }
        return false;
    }

    public static void deleteAllShifts() throws DatabaseException {
        List<Shift> shiftList = DatabaseServices.getAllShifts();
        for (Shift shift : shiftList){
            DatabaseServices.deleteShift(shift);
        }
    }
    public static void deleteAllEmployees() throws DatabaseException {
        for (Employee employee : DatabaseServices.getAllEmployees()){
            DatabaseServices.deleteEmployee(employee);
        }
    }
    public static void deleteAllOrganizations() throws DatabaseException {
        for (Organization organization : DatabaseServices.getAllOrganizations()){
            DatabaseServices.deleteOrganization(organization);
        }
    }

    public static void deleteAllManagers() throws DatabaseException {
        for (Manager manager : DatabaseServices.getAllManagers()){
            DatabaseServices.deleteManager(manager);
        }
    }

    public static void clearAllDatabases(){
        try {
            deleteAllShifts();
            deleteAllEmployees();
            deleteAllOrganizations();
            deleteAllManagers();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }


    public static void saveEmployeesFromList(final List<Employee> pEmployeeList) throws SvcException {
        for (Employee employee : pEmployeeList){
            try{
                DatabaseServices.saveEmployee(employee);
            } catch (DatabaseException e) {
                e.printStackTrace();
                throw new SvcException("error saving list of employees");
            }
        }
    }

    public static void saveManagersFromList(final List<Manager> pManagerList) throws SvcException {
        for (Manager manager : pManagerList){
            try{
                DatabaseServices.saveManager(manager);
            } catch (DatabaseException e) {
                e.printStackTrace();
                throw new SvcException("error saving list of managers");
            }
        }
    }

    public static void saveOrganizationsFromList(final List<Organization> pOrganizationList) throws SvcException {
        for (Organization organization : pOrganizationList){
            try{
                DatabaseServices.saveOrganization(organization);
            } catch (DatabaseException e) {
                e.printStackTrace();
                throw new SvcException("error saving list of organizations");
            }
        }
    }

    public static void saveShiftsFromList(final List<Shift> pShiftList) throws SvcException {
        for (Shift shift : pShiftList){
            try{
                DatabaseServices.saveShift(shift);
            } catch (DatabaseException e) {
                e.printStackTrace();
                throw new SvcException("error saving list of shifts");
            }
        }
    }


    public static Organization findOrganizationByLocationId(final ObjectId pLocationId, final List<Organization> pOrganizationList) throws SvcException {
        try{
            return pOrganizationList.stream()
                    .filter(organization -> organization.getLocationList().stream()
                            .anyMatch(location -> location.getLocationId().equals(pLocationId)))
                    .findFirst().get();
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("error finding organization by locationId");
        }
    }
}
