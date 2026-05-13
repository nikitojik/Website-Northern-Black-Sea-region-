package dto;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

@Data
@Builder
public class CityDto {
    private Long id;
    private String slug;
    private String title;
    private String greek;
    private String image;
    private Double lat;          // Координата широты для карты
    private Double lng;          // Координата долготы для карты
    private boolean isMajor;     // Крупнейшее поселение
    private boolean isHermitage; // Экспедиция Эрмитажа
    private boolean isPlaceholder;
    private Map<String, Object> content; // Весь сложный текст (блоки, сноски)
}