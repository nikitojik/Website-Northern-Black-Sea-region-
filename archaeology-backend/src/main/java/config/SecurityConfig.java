package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Отключаем CSRF для упрощения работы с REST API на данном этапе
                .csrf(csrf -> csrf.disable())

                // Настраиваем правила доступа
                .authorizeHttpRequests(auth -> auth
                        // Гости (и все остальные) могут делать GET-запросы к нашему API
                        .requestMatchers(HttpMethod.GET, "/api/v1/**").permitAll()
                        // Любые другие действия (POST, DELETE) или другие эндпоинты требуют роли ADMIN
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                // Включаем базовую авторизацию (подойдет для браузера и простых запросов)
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    // Создаем администратора в памяти
    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("admin123")
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }
}