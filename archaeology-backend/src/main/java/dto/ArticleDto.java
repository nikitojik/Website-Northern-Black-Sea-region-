package dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArticleDto {
    private Long id;
    private String title;
    private String period;       // Фронт ждет строку "Период" (например, "1934-2023")
    private String image;
    private String shortText;    // В JSON фронта это поле называется "short"
    private String fullText;     // В JSON фронта это поле называется "full"
    private boolean isPlaceholder;
}