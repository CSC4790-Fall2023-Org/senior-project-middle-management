package com.ems.controllers;

import com.ems.Utils.EmployeeUtils;
import com.ems.database.models.Employee;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public ResponseEntity test() {
        return ResponseEntity.status(200).body("Hello World!");
    }
}
