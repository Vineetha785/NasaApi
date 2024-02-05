package com.Assignment.SpringNasa.controller;




import com.Assignment.SpringNasa.model.NasaApodResponse;
import com.Assignment.SpringNasa.service.NasaApodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nasa/apod")
public class NasaApodController {

    private final NasaApodService nasaApodService;

    @Autowired
    public NasaApodController(NasaApodService nasaApodService) {
        this.nasaApodService = nasaApodService;
    }

    @GetMapping
    public ResponseEntity<List<NasaApodResponse>> getApod(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String start_date,
            @RequestParam(required = false) String end_date,
            @RequestParam(required = false) Integer count,
            @RequestParam(required = false) Boolean thumbs) {
        return ResponseEntity.ok(nasaApodService.getApod(date, start_date, end_date, count, thumbs));
    }
}

