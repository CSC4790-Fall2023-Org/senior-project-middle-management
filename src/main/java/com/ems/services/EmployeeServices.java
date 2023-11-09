package com.ems.services;
import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.*;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

import java.util.List;


public class EmployeeServices {

    public static ResponseEntity createEmployee(final String pPayload) {
        try{
            Employee employee = JsonUtils.getEmployeeFromJSON(new JSONObject(pPayload));
            ValidationServices.validateCreateEmployee(employee);
            DatabaseServices.saveEmployee(employee);
        }
        catch (Exception e){
            return ResponseUtils.errorResponse(e);
        }
        return ResponseEntity.status(200).body(ResponseUtils.successfulCreationResponse("Employee created successfully"));
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

    public static ResponseEntity getAvailableShifts(final String pPayload){
        try{
            final ObjectId employeeId = JsonUtils.getEmployeeIdFromJSON(new JSONObject(pPayload));

            final Employee employee = DatabaseServices.findEmployeeById(employeeId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_EMPLOYEE, employeeId));

            final Organization organization = DatabaseServices.findOrganizationById(employee.getOrganizationId())
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, employee.getOrganizationId()));

            final List<Shift> shiftList = DatabaseServices.getAllShifts();

            final List<Shift> availableShifts = ShiftUtils.getAvailableShiftsForEmployee(employee, organization, shiftList);

            final JSONObject shiftResponse = ResponseUtils.getShiftsResponse(availableShifts);

            return ResponseEntity.status(200).body(shiftResponse.toString());
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    public static ResponseEntity getClaimedShifts(final String pPayload){
        try{
            final ObjectId employeeId = JsonUtils.getEmployeeIdFromJSON(new JSONObject(pPayload));
            final Employee employee = DatabaseServices.findEmployeeById(employeeId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_EMPLOYEE, employeeId));
            final List<ObjectId> claimedShifts = employee.getShiftIdList();

            final List<Shift> shiftList = DatabaseServices.getAllShifts();

            final List<Shift> claimedShiftsList = ShiftUtils.getClaimedShiftsList(claimedShifts, shiftList);

            final JSONObject shiftResponse = ResponseUtils.getShiftsResponse(claimedShiftsList);

            return ResponseEntity.status(200).body(shiftResponse.toString());

        } catch (Exception e) {
            return ResponseUtils.errorResponse(e);
        }
    }

    public static ResponseEntity updateEmployee(final String pPayload) {
        try{

            final JSONObject payload = JsonUtils.createJsonObject(pPayload);

            final ObjectId employeeId = JsonUtils.getEmployeeIdFromJSON(payload);

            final Employee employee = DatabaseServices.findEmployeeById(employeeId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_EMPLOYEE, employeeId));

            final JSONObject updateMap = payload.getJSONObject("updateMap");

            final Employee updatedEmployee = EmployeeUtils.updateEmployee(employee, payload);

            DatabaseServices.saveEmployee(updatedEmployee);

            return ResponseUtils.successfulCreationResponse("Employee updated successfully");
        }
        catch (Exception e){
            return ResponseUtils.errorResponse(e);
        }
    }
}
