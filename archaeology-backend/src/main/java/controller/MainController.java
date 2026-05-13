package controller;
import dto.CityDto;
import dto.ArticleDto;
import service.DataService;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*") // Чтобы фронтенд мог достучаться до бэкенда
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

}