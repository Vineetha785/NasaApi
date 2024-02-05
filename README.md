Spring Nasa Api:-
SpringNasa is a Spring Boot application designed to fetch and display the Astronomy Picture of the Day (APOD) from NASA's APOD API. It provides an easy-to-use RESTful API endpoint to retrieve APOD data for specific dates, date ranges, or randomly selected entries, with support for thumbnail previews of video media types.

Parameters:
date: Fetch the APOD for a specific date (YYYY-MM-DD).
start_date: Fetch APOD starting from this date (used with end_date for a range).
end_date: Fetch APOD up to this date (used with start_date for a range).
count: Fetch a specified number of random APOD entries (ignores date parameters).
thumbs: Include thumbnail URLs for video media types.

Configuration:
Before running the application, ensure to set  NASA API key in the application.properties file:
Application.properties:
nasa.api.key=fbNyjiNhuC5opvRyd9VvrAHzF9aSHrOouOfXEczs
server.port=3030

SpringNasaApplication (Main Application Class):

This is the main class that bootstraps and launches the Spring Boot application. It uses the @SpringBootApplication annotation, enabling auto-configuration, component scanning, and property support.
package com.Assignment.SpringNasa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringNasaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringNasaApplication.class, args);
	}

}

NasaApodController (Controller Layer)

The NasaApodController class serves as the controller layer in the application. It handles HTTP requests to the /api/nasa/apod endpoint. The controller uses the NasaApodService to fetch data from the NASA APOD API and return it to the client.

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

NasaApodResponse (Model Layer):

This class represents the data model for the NASA APOD response.
 It contains fields such as date, explanation, url, title, mediaType, and thumbnailUrl. Getters and setters are provided for each field.

 package com.Assignment.SpringNasa.model;





public class NasaApodResponse {
    private String date;
    private String explanation;
    private String url;
    private String title;
    private String mediaType; 
    private String thumbnailUrl; 

    // Default constructor
    public NasaApodResponse() {
    }

    // Getters and setters
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }
}


NasaApodService (Service Layer):

The NasaApodService class encapsulates the logic to interact with the NASA APOD API. 
It constructs the request URL with the necessary query parameters and uses RestTemplate to call the API. 
It handles both single object responses and lists of objects, returning a list of NasaApodResponse objects.

package com.Assignment.SpringNasa.service;



import com.Assignment.SpringNasa.model.NasaApodResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;

@Service
public class NasaApodService {
    @Value("${nasa.api.key}")
    private String apiKey;

    private static final String NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";

    public List<NasaApodResponse> getApod(String date, String start_date, String end_date, Integer count, Boolean thumbs) {
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(NASA_APOD_URL)
                .queryParam("api_key", apiKey)
                .queryParam("date", date)
                .queryParam("start_date", start_date)
                .queryParam("end_date", end_date)
                .queryParam("count", count)
                .queryParam("thumbs", thumbs);

        String url = uriBuilder.toUriString();

        // Attempt to fetch as a list first
        try {
            ResponseEntity<List<NasaApodResponse>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<NasaApodResponse>>() {}
            );
            return responseEntity.getBody();
        } catch (Exception e) {
            // Fallback for single object response
            try {
                NasaApodResponse singleResponse = restTemplate.getForObject(url, NasaApodResponse.class);
                return Collections.singletonList(singleResponse);
            } catch (Exception ex) {
                // Handle the error appropriately
                throw new RuntimeException("Error fetching APOD data: " + ex.getMessage(), ex);
            }
        }
    }
}

Endpoints:
GET /api/nasa/apod: Fetches the astronomy picture of the day.

Example URLs:
 date  :- http://localhost:3030/api/nasa/apod?date=2024-02-04
<img width="769" alt="Screenshot 2024-02-04 194557" src="https://github.com/Vineetha785/NasaApi/assets/158524491/879e45e8-86fb-43da-85b2-5d57d636f5b5">

start_date and end_date  :-  http://localhost:3030/api/nasa/apod?start_date=2024-02-01&end_date=2024-02-03
<img width="769" alt="Screenshot 2024-02-04 195138" src="https://github.com/Vineetha785/NasaApi/assets/158524491/8e9119a1-6f08-46bb-83f8-4e48b61d374d">
<img width="762" alt="Screenshot 2024-02-04 195151" src="https://github.com/Vineetha785/NasaApi/assets/158524491/2fdf4a20-ec97-4a0c-a68d-655622b25512">



  count :-     http://localhost:3030/api/nasa/apod?count=3
  <img width="763" alt="Screenshot 2024-02-04 194630" src="https://github.com/Vineetha785/NasaApi/assets/158524491/13cc9aa8-f05a-4d82-94e1-3a7a44a31246">

