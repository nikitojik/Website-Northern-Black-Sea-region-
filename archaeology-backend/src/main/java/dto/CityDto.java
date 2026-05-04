package dto;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

@Data
@Builder
public class CityDto {
    private Long id;
    private String slug;         // например, "pantikapey"
    private String title;        // "Пантикапей"
    private String greek;        // "Παντικάπαιον"
    private String image;        // Ссылка на картинку или имя файла
    private boolean isPlaceholder;

    // Используем Object или Map для сложного текста с блоками и сносками
    private Map<String, Object> content;
}