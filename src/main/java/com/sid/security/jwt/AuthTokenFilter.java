package com.sid.security.jwt;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sid.security.services.TokenBlacklistService;
import com.sid.security.services.UserDetailsServiceImpl;

public class AuthTokenFilter extends OncePerRequestFilter {
  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);
  
  
  @Autowired
  private TokenBlacklistService tokenBlacklistService;

//  @Override
//  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//          throws ServletException, IOException {
//
//      String token = getJwtFromRequest(request);
//
//      if (StringUtils.hasText(token) && jwtUtils.validateJwtToken(token)) {
//          if (!tokenBlacklistService.isTokenBlacklisted(token)) {
//        	  Authentication authentication = jwtUtils.getUserNameFromJwtToken(token);
//              SecurityContextHolder.getContext().setAuthentication(authentication);
//          }
//      }
//
//      filterChain.doFilter(request, response);
//  }
//
//  private String getJwtFromRequest(HttpServletRequest request) {
//      String bearerToken = request.getHeader("Authorization");
//      if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
//          return bearerToken.substring(7);
//      }
//      return null;
//  }


  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String jwt = parseJwt(request);
      if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
    	  
          if (!tokenBlacklistService.isTokenBlacklisted(jwt)) {
        String username = jwtUtils.getUserNameFromJwtToken(jwt);

        
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
          }
      }
    } catch (Exception e) {
      logger.error("Cannot set user authentication: {}", e);
    }

    filterChain.doFilter(request, response);
  }

  private String parseJwt(HttpServletRequest request) {
    String headerAuth = request.getHeader("Authorization");

    if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
      return headerAuth.substring(7);
    }

    return null;
  }
}
