package com.ems.controllers;

import com.ems.services.ShiftServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShiftController {

    @PostMapping("/createShift")
    public static ResponseEntity createShift(@RequestBody final String pPayload) {
        return ShiftServices.createShift(pPayload);
    }

    @PostMapping("/createShifts")
    public static ResponseEntity createShifts(@RequestBody final String pPayload) {
        return ShiftServices.createShifts(pPayload);
    }

    @PostMapping("/deleteAllShifts")
    public static ResponseEntity deleteAllShifts(@RequestBody final String pPayload){
        return ShiftServices.deleteAllShifts(pPayload);
    }

    @PostMapping("getShiftCreationInfo")
    public static ResponseEntity getShiftCreationInfo(@RequestBody final String pPayload){
        return ShiftServices.getShiftCreationInfo(pPayload);
    }

    @PostMapping("/transferShift")
    public static ResponseEntity transferShift(@RequestBody final String pPayload){
        return ShiftServices.transferShift(pPayload);
    }

    @PostMapping("/getTransferredShiftsForEmployee")
    public static ResponseEntity getTransferredShiftsForEmployee(@RequestBody final String pPayload){
        return ShiftServices.getTransferredShiftsForEmployee(pPayload);
    }

    @PostMapping("/acceptTransferredShift")
    public static ResponseEntity acceptTransferredShift(@RequestBody final String pPayload){
        return ShiftServices.acceptTransferredShift(pPayload);
    }

}
