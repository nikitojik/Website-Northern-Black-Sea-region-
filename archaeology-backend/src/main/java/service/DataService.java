package service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class DataService {
    private final ObjectMapper mapper = new ObjectMapper();

    // Универсальный метод для чтения любого списка данных
    public <T> List<T> readJsonFile(String fileName, TypeReference<List<T>> typeReference) {
        try {
            return mapper.readValue(
                    new ClassPathResource("data/" + fileName).getInputStream(),
                    typeReference
            );
        } catch (IOException e) {
            throw new RuntimeException("Не удалось прочитать файл: " + fileName, e);
        }
    }
}