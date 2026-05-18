package controller;

import dto.CityDto;
import dto.ArticleDto;
import service.DataService;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class MainController {

    private final DataService dataService;

    public MainController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/cities")
    public List<CityDto> getCities() {
        return dataService.readJsonFile("cities.json", new TypeReference<List<CityDto>>() {});
    }

    @GetMapping("/expeditions")
    public List<ArticleDto> getExpeditions() {
        return dataService.readJsonFile("expeditions.json", new TypeReference<List<ArticleDto>>() {});
    }

    @GetMapping("/history")
    public List<ArticleDto> getHistory() {
        return dataService.readJsonFile("history.json", new TypeReference<List<ArticleDto>>() {});
    }

    @GetMapping("/auth/status")
    public Map<String, Object> getAuthStatus(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || authentication.getName().equals("anonymousUser")) {
            return Map.of("role", "ROLE_GUEST", "isAuthenticated", false);
        }
        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_GUEST");
        return Map.of("username", authentication.getName(), "role", role, "isAuthenticated", true);
    }
}