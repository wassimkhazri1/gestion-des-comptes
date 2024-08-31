package com.sid.dto;

import java.util.Date;

public class DataDto {

	private String x; // dateOperation
	private double y; // montant

	public DataDto() {
		super();
	}

	public DataDto(String x, double y) {
		super();
		this.x = x;
		this.y = y;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

}
