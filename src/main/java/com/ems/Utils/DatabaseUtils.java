package com.ems.Utils;

import com.ems.Exceptions.DatabaseException;
import com.ems.database.models.Shift;
import com.ems.services.DatabaseServices;

import java.util.List;

public class DatabaseUtils {
    public static void saveShiftsFromList(final List<Shift> pShiftList) throws DatabaseException {
        for (Shift shift : pShiftList){
            DatabaseServices.saveShift(shift);
        }
    }
}
