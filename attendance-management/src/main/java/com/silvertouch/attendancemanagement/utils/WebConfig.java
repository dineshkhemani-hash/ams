package com.silvertouch.attendancemanagement.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration // means it will be used by ioc container for source of bean definition
public class WebConfig implements WebMvcConfigurer {
    @Bean // method produced should be managed by spring container
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/v1/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")  // Make sure OPTIONS is included
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600); // 7 days
            }
        };
    }
}
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new AdminAuthInterceptors()).addPathPatterns("/api/v1/**");
//    }