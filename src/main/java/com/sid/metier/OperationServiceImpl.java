package com.sid.metier;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

//import com.itextpdf.text.Document;
//import com.itextpdf.text.DocumentException;
//import com.itextpdf.text.Paragraph;
//import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sid.entities.Operation;
import java.io.IOException;
//import com.itextpdf.kernel.pdf.PdfWriter;
//import com.itextpdf.layout.element.Paragraph;
import com.sid.dao.OperationRepository;
import com.sid.metier.OperationService;

import jakarta.servlet.http.HttpServletResponse;

import com.itextpdf.text.pdf.draw.LineSeparator;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.BaseColor;
import java.util.Date;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

@Service
public class OperationServiceImpl implements OperationService {

	@Autowired
	private OperationRepository operationRepository;

	@Override
	public Operation saveOperation(Operation operation) {
		return operationRepository.save(operation);
	}

	@Override
	public Operation updateOperation(Operation operation) {
		if (operationRepository.existsById(operation.getNumero())) {
			return operationRepository.save(operation);
		} else {
			// Gestion des erreurs si le compte n'existe pas
			return null;
		}
	}

	@Override
	public void deleteOperation(Long id) {
		if (operationRepository.existsById(id)) {
			operationRepository.deleteById(id);
		} else {
			// Gestion des erreurs si le compte n'existe pas
		}
	}

	@Override
	public Optional<Operation> findOperationById(Long id) {
		return operationRepository.findById(id);
	}

	@Override
	public List<Operation> findAllOperations() {
		return operationRepository.findAll();
	}

	public void exportOperationsToPdf(List<Operation> operations, HttpServletResponse response)
			throws IOException, DocumentException {
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());

		// Add header and footer
		HeaderFooterPageEvent event = new HeaderFooterPageEvent();
		writer.setPageEvent(event);

		document.open();

		// Add title
		Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
		Paragraph title = new Paragraph("Liste des Opérations", titleFont);
		title.setAlignment(Element.ALIGN_CENTER);
		document.add(title);

		// Add generation date
		Font dateFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
		Paragraph date = new Paragraph("Date de génération: " + new Date().toString(), dateFont);
		date.setAlignment(Element.ALIGN_RIGHT);
		document.add(date);

		// Add a line separator
		LineSeparator ls = new LineSeparator();
		ls.setLineColor(BaseColor.BLACK);
		document.add(new Chunk(ls));

		// Create table with 6 columns
		PdfPTable table = new PdfPTable(6);
		table.setWidthPercentage(100);
		table.setSpacingBefore(10f);
		table.setSpacingAfter(10f);

		// Add table headers
		Stream.of("N°", "Date", "Montant", "Code Compte", "Type", "Code Destinataire").forEach(columnTitle -> {
			PdfPCell header = new PdfPCell();
			header.setBackgroundColor(BaseColor.LIGHT_GRAY);
			header.setBorderWidth(2);
			header.setPhrase(new Phrase(columnTitle));
			table.addCell(header);
		});

		// Add rows
		for (Operation operation : operations) {
			table.addCell(String.valueOf(operation.getNumero()));
			table.addCell(operation.getDateOperation().toString());
			table.addCell(String.valueOf(operation.getMontant()));
			table.addCell(String.valueOf(operation.getCompte().getCodeCompte()));
			table.addCell(operation.getClass().getSimpleName());
			table.addCell(String.valueOf(operation.getCodeDestinataire()));
		}

		document.add(table);
		document.close();
	}

	class HeaderFooterPageEvent extends PdfPageEventHelper {
		Font footerFont = FontFactory.getFont(FontFactory.HELVETICA, 10);

		@Override
		public void onEndPage(PdfWriter writer, Document document) {
			// Police pour le footer
			Font footerFont = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.GRAY);

			// Création de la phrase pour le footer
			Phrase footer = new Phrase("Developed by Wassim Khazri | Page " + document.getPageNumber(), footerFont);

			// Ajout du texte au centre en bas de la page
			ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_CENTER, footer,
					(document.right() - document.left()) / 2 + document.leftMargin(), document.bottom() - 10, 0);
		}

	}

	public void exportOperationsToExcel(List<Operation> operations, HttpServletResponse response) throws IOException {
		Workbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("Operations");

		// Add headers and data rows
		Row header = sheet.createRow(0);
		header.createCell(0).setCellValue("N°");
		header.createCell(1).setCellValue("Date");
		header.createCell(2).setCellValue("Montant");
		header.createCell(3).setCellValue("Code Compte");
		header.createCell(4).setCellValue("Type");
		header.createCell(5).setCellValue("Code Destinataire");
		// Add more headers

		int rowNum = 1;
		for (Operation operation : operations) {
			Row row = sheet.createRow(rowNum++);
			row.createCell(0).setCellValue(operation.getNumero());
			row.createCell(1).setCellValue(operation.getDateOperation().toString());
			row.createCell(2).setCellValue(operation.getMontant());
			row.createCell(3).setCellValue(operation.getCompte().getCodeCompte());
			row.createCell(4).setCellValue(operation.getClass().getSimpleName());
//	        row.createCell(5).setCellValue(operation.getCodeDestinataire());
			// Add more cells
		}

		try {
			workbook.write(response.getOutputStream());
		} catch (java.io.IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			workbook.close();
		} catch (java.io.IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public Double calculerTotalVersementByMonth(int month, String typeOperation) {
		return operationRepository.getTotalVersementByMonth(month,typeOperation);
	}
	//Double totalVersement = repository.getTotalVersementByMonth(8, "Versement");


	@Override
	public Double calculerTotalByMonth(int month) {
		return operationRepository.getTotalByMonth(month);
	}

	@Override
	public List<Operation> getOperationsByMonth(int month) {
		return operationRepository.getByMonth(month);
	}

}
