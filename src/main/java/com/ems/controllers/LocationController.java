package com.ems.controllers;

import com.ems.Utils.LocationUtils;
import com.ems.services.LocationServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {

    @PostMapping("/createLocation")
    public ResponseEntity createLocation(@RequestBody final String pPayload) {
        return LocationServices.createLocation(pPayload);
    }

    @PostMapping("/deleteLocation")
    public ResponseEntity deleteLocation(@RequestBody final String pPayload) {
        return LocationServices.deleteLocation(pPayload);
    }

}
