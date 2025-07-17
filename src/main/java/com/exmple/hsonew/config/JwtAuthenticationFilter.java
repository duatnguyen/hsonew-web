package com.exmple.hsonew.config;

import com.exmple.hsonew.repositories.JwtBlacklistRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final JwtBlacklistRepository jwtBlacklistRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        log.debug("Request: method={}, path={}", request.getMethod(), request.getRequestURI());
        try {
            if (shouldSkipFilter(request)) {
                log.debug("Skip JWT filter for: {} {}", request.getMethod(), request.getRequestURI());
                filterChain.doFilter(request, response);
                return;
            }

            final String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                log.debug("No Bearer token, skip JWT auth for path: {}", request.getRequestURI());
                filterChain.doFilter(request, response);
                return;
            }

            final String jwt = authHeader.substring(7);
            final String username = jwtService.extractUsername(jwt);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtService.validateToken(jwt) && !isTokenBlacklisted(jwt)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.debug("Successfully authenticated user: {}", username);
                } else {
                    log.debug("Token validation failed or token is blacklisted for user: {}", username);
                }
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error("Error processing JWT token: {}", e.getMessage());
            SecurityContextHolder.clearContext();
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
        }
    }

    private boolean isTokenBlacklisted(String token) {
        try {
            return jwtBlacklistRepository.existsByToken(token);
        } catch (Exception e) {
            log.error("Error checking token blacklist: {}", e.getMessage());
            return true;
        }
    }

    private boolean shouldSkipFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        String method = request.getMethod();
        boolean skip = ((path.endsWith("/auth/login") && "POST".equalsIgnoreCase(method)) ||
                (path.endsWith("/auth/register") && "POST".equalsIgnoreCase(method)) ||
                path.matches("^(/api)?/auth/forgot-password/?$") ||
                path.matches("^(/api)?/auth/reset-password(/.*)?$") ||
                path.matches("^(/api)?/giftcodes/?$") ||
                path.matches("^(/api)?/rankings/?$") ||
                path.matches("^(/api)?/rechargeCard(/.*)?$") ||
                path.matches("^(/api)?/recharge(/.*)?$") ||
                path.matches("^(/api)?/bank-deposits(/.*)?$") ||
                path.matches("^(/api)?/card-transactions(/.*)?$") ||
                path.equals("/error") ||
                path.startsWith("/swagger-ui/") ||
                path.startsWith("/v3/api-docs"));
        if (skip) {
            log.debug("shouldSkipFilter=true for: {} {}", method, path);
        }
        return skip;
    }

}
