package com.sid.controllers;

import java.io.IOException;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sid.models.ERole;
import com.sid.models.Role;
import com.sid.models.User;
import com.sid.payload.request.LoginRequest;
import com.sid.payload.request.SignupRequest;
import com.sid.payload.response.JwtResponse;
import com.sid.payload.response.MessageResponse;
import com.sid.repository.RoleRepository;
import com.sid.repository.UserRepository;
import com.sid.security.jwt.JwtUtils;
import com.sid.security.services.TokenBlacklistService;
import com.sid.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;
//	CreatedAndDevelopedByWassimKhazri
//	https://www.linkedin.com/in/wassim-khazri-ab923a14b/
	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	private TokenBlacklistService tokenBlacklistService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());
//		CreatedAndDevelopedByWassimKhazri
//		https://www.linkedin.com/in/wassim-khazri-ab923a14b/
		return ResponseEntity.ok(
				new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),userDetails.getPhoto(), roles));
	}

//	@PostMapping("/signup")
//	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
//		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
//			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
//		}
//
//		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
//			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
//		}
//
//		// Create new user's account
//		User user = new User(signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()),
//				 signUpRequest.getUsername(),signUpRequest.getPhoto());
//
//		Set<String> strRoles = signUpRequest.getRole();
//		Set<Role> roles = new HashSet<>();
////		CreatedAndDevelopedByWassimKhazri
////		https://www.linkedin.com/in/wassim-khazri-ab923a14b/
//		if (strRoles == null) {
//			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
//					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//			roles.add(userRole);
//		} else {
//			strRoles.forEach(role -> {
//				switch (role) {
//				case "admin":
//					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					roles.add(adminRole);
//
//					break;
//				case "mod":
//					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					roles.add(modRole);
//
//					break;
//				default:
//					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					roles.add(userRole);
//				}
//			});
//		}
//
//		user.setRoles(roles);
//		userRepository.save(user);
//
//		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
//	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@ModelAttribute SignupRequest signUpRequest) throws IOException {
	    // Extraire les informations de l'objet SignupRequest
	    String username = signUpRequest.getUsername();
	    String email = signUpRequest.getEmail();
	    String password = signUpRequest.getPassword();
	    Set<String> role = signUpRequest.getRole();
	    MultipartFile photo = signUpRequest.getPhoto();
	    
	    // Convertir la photo en base64
	    String photoBase64 = Base64.getEncoder().encodeToString(photo.getBytes());
	    
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
		return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
	}

	if (userRepository.existsByEmail(signUpRequest.getEmail())) {
		return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
	}
	    
	    // Créer un nouvel utilisateur avec les données extraites
	    User user = new User( email, encoder.encode(password),username, photoBase64);
	    
	    // Gérer les rôles comme d'habitude
	    
		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();
//		CreatedAndDevelopedByWassimKhazri
//		https://www.linkedin.com/in/wassim-khazri-ab923a14b/
		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(rol -> {
				switch (rol) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);	    
	    userRepository.save(user);

	    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}


	
	@PostMapping("/signout")
	public ResponseEntity<?> signOutUser(HttpServletRequest request) {
		// Extract the JWT token from the request header
		String token = request.getHeader("Authorization");

		if (token != null && token.startsWith("Bearer ")) {
			token = token.substring(7); // Remove "Bearer " prefix

			// Optionally, blacklist the token
			tokenBlacklistService.blacklistToken(token);

			return ResponseEntity.ok().body("User signed out successfully.");
		} else {
			return ResponseEntity.badRequest().body("No valid token found.");
		}
	}

}
