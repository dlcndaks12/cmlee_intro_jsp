package com.lcm.web.tetris.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class Tetris {
	private int sq;
	private String id;
	private int score;
	private Date rgsdt;
}
