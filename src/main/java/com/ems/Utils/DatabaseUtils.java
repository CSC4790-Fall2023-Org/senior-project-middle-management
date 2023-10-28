package com.ems.Utils;

import com.ems.Exceptions.DatabaseException;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.services.DatabaseServices;
import org.bson.types.ObjectId;

import javax.xml.crypto.Data;
import java.util.List;

public class DatabaseUtils {
    public static void saveShiftsFromList(final List<Shift> pShiftList) throws DatabaseException {
        for (Shift shift : pShiftList){
            DatabaseServices.saveShift(shift);
        }
    }

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
}
