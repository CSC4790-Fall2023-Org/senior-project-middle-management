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
    public ResponseEntity createEmployee(@RequestBody final RequestEntity<String> pPayload) {
        final HttpMethod method = pPayload.getMethod();
        final URI url = pPayload.getUrl();
        final String body = pPayload.getBody();


        return EmployeeServices.createEmployee(method, url, body);
    }
}
