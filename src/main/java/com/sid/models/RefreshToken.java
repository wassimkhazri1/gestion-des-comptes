//package com.sid.models;
//
//import java.time.Instant;
////CreatedAndDevelopedByWassimKhazri
////https://www.linkedin.com/in/wassim-khazri-ab923a14b/
//import jakarta.persistence.*;
//
//@Entity(name = "refreshtoken")
//public class RefreshToken {
//  @Id
//  @GeneratedValue(strategy = GenerationType.AUTO)
//  private long id;
//
//  @OneToOne
//  @JoinColumn(name = "user_id", referencedColumnName = "id")
//  private User user;
//
//  @Column(nullable = false, unique = true)
//  private String token;
//
//  @Column(nullable = false)
//  private Instant expiryDate;
//
//public long getId() {
//	return id;
//}
//
//public void setId(long id) {
//	this.id = id;
//}
//
//public User getUser() {
//	return user;
//}
//
//public void setUser(User user) {
//	this.user = user;
//}
//
//public String getToken() {
//	return token;
//}
//
//public void setToken(String token) {
//	this.token = token;
//}
//
//public Instant getExpiryDate() {
//	return expiryDate;
//}
//
//public void setExpiryDate(Instant expiryDate) {
//	this.expiryDate = expiryDate;
//}
//
//
//}
