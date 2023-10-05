package com.ems.controllers;

import com.ems.services.ManagerServices;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class ManagerController {
    @PostMapping("/createManager")
    public ResponseEntity createManager(@RequestBody final String pPayload) {
        return ManagerServices.createManager(pPayload);
    }
}
