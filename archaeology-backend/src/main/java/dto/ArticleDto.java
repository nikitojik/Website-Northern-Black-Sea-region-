package dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArticleDto {
    private Long id;
    private String title;
    private String period;
    private String image;
    private String shortText; // Краткое описание для списка
    private String fullText;  // Полный текст для страницы детализации
    private boolean isPlaceholder;
}