package controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class MainController {

    // Универсальный метод для получения данных из JSON-файлов
    @GetMapping("/{type}")
    public ResponseEntity<String> getData(@PathVariable String type) {
        try {
            // Ищет файл в src/main/resources/data/{type}.json
            Path path = new ClassPathResource("data/" + type + ".json").getFile().toPath();
            String jsonContent = Files.readString(path);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(jsonContent);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("{\"error\": \"Данные не найдены\"}");
        }
    }
}