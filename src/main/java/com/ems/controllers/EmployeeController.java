package com.ems.controllers;

import com.ems.services.EmployeeServices;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class EmployeeController {

    @PostMapping("/createEmployee")
    public ResponseEntity createEmployee(@RequestBody final String pPayload) {
        return EmployeeServices.createEmployee(pPayload);
    }

    @PostMapping("/deleteEmployee")
    public ResponseEntity deleteEmployee(@RequestBody final String pPayload) {
        return EmployeeServices.deleteEmployee(pPayload);
    }

    @PostMapping("/assignShift")
    public ResponseEntity assignShift(@RequestBody final String pPayload) {
        return EmployeeServices.assignShiftToEmployee(pPayload);
    }

    @PostMapping("/getAvailableShifts")
    public ResponseEntity getAvailableShifts(@RequestBody final String pPayload){
        return EmployeeServices.getAvailableShifts(pPayload);
    }
}
