package com.ems.services;
import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.EmployeeUtils;
import com.ems.Utils.JsonUtils;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import javax.xml.crypto.Data;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

public class EmployeeServices {

    public static ResponseEntity createEmployee(final String pPayload) {
        Employee employee;
        try{
            employee = JsonUtils.getEmployeeFromJSON(new JSONObject(pPayload));
        } catch (SvcException | JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());

        }

        try {
            ValidationServices.validateCreateEmployee(employee);
        }
        catch (SvcException e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try{
            DatabaseServices.saveEmployee(employee);
        } catch (DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        return ResponseEntity.status(200).body("Employee created successfully");
    }

    public static ResponseEntity deleteEmployee(final String pPayload) {

        Employee employee;
        ObjectId employeeId;
        try {
            employeeId = JsonUtils.getEmployeeIdFromJSON(new JSONObject(pPayload));
        }
        catch (SvcException | JSONException e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try{
            employee = DatabaseServices.findEmployeeById(employeeId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_EMPLOYEE, employeeId));
        } catch (DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try {
            ValidationServices.validateDeleteEmployee(employee);
        }
        catch (SvcException e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try{
            DatabaseServices.deleteEmployee(employee);
        } catch (DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Employee deleted successfully");
    }

    public static ResponseEntity assignShiftToEmployee(final String pPayload){
        ObjectId employeeId;
        ObjectId shiftId;

        try {
            employeeId = JsonUtils.getEmployeeIdFromJSON(new JSONObject(pPayload));
            shiftId = JsonUtils.getShiftIdFromJSON(new JSONObject(pPayload));
        } catch (SvcException | JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        Object[] assignShiftToEmployee;
        Shift shift;
        Employee employee;
        try {
            assignShiftToEmployee = EmployeeUtils.assignShiftToEmployeeUsingIDS(employeeId, shiftId);
            employee = (Employee) assignShiftToEmployee[0];
            shift = (Shift) assignShiftToEmployee[1];
        } catch (SvcException | DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try {
            DatabaseServices.saveEmployee(employee);
            DatabaseServices.saveShift(shift);
        } catch (DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Shift assigned to employee successfully");
    }
}
