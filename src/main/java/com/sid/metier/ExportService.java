package com.sid.metier;

//import com.itextpdf.text.*;
//import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class ExportService {

//    public ByteArrayInputStream generatePdf(List<MyEntity> entities) {
//        Document document = new Document();
//        ByteArrayOutputStream out = new ByteArrayOutputStream();
//
//        try {
//            PdfWriter.getInstance(document, out);
//            document.open();
//
//            // Ajout de contenu au PDF
//            Font font = FontFactory.getFont(FontFactory.COURIER, 12, BaseColor.BLACK);
//            for (MyEntity entity : entities) {
//                document.add(new Paragraph("Données: " + entity.getField(), font));
//            }
//
//            document.close();
//        } catch (DocumentException ex) {
//            ex.printStackTrace();
//        }
//
//        return new ByteArrayInputStream(out.toByteArray());
//    }
//    
//    public ByteArrayInputStream generateExcel(List<MyEntity> entities) {
//        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
//            Sheet sheet = workbook.createSheet("Data");
//
//            // Créer un en-tête
//            Row headerRow = sheet.createRow(0);
//            Cell cell = headerRow.createCell(0);
//            cell.setCellValue("Field");
//
//            // Remplir les données
//            int rowIdx = 1;
//            for (MyEntity entity : entities) {
//                Row row = sheet.createRow(rowIdx++);
//                row.createCell(0).setCellValue(entity.getField());
//            }
//
//            workbook.write(out);
//            return new ByteArrayInputStream(out.toByteArray());
//        } catch (IOException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
}

