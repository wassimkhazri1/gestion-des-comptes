package com.sid.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.sid.metier.ExportService;

@RestController
@RequestMapping("/api/admin/export")
public class ExportController {

//    @Autowired
//    private ExportService exportService;
//
//    @GetMapping("/pdf")
//    public ResponseEntity<InputStreamResource> exportToPdf() {
//        List<MyEntity> entities = myEntityService.getAllEntities(); // Obtenez vos données
//        ByteArrayInputStream bis = exportService.generatePdf(entities);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Disposition", "inline; filename=export.pdf");
//
//        return ResponseEntity
//                .ok()
//                .headers(headers)
//                .contentType(MediaType.APPLICATION_PDF)
//                .body(new InputStreamResource(bis));
//    }
//
//    @GetMapping("/excel")
//    public ResponseEntity<InputStreamResource> exportToExcel() {
//        List<MyEntity> entities = myEntityService.getAllEntities(); // Obtenez vos données
//        ByteArrayInputStream bis = exportService.generateExcel(entities);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Disposition", "inline; filename=export.xlsx");
//
//        return ResponseEntity
//                .ok()
//                .headers(headers)
//                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
//                .body(new InputStreamResource(bis));
//    }
}

