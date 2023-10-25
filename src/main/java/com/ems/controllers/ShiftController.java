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

}
