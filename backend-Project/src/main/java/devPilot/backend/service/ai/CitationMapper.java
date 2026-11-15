package devPilot.backend.service.ai;


import devPilot.backend.dto.CitationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Component;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.json.JsonMapper;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CitationMapper {

    private final JsonMapper jsonMapper;

    public CitationDto formDocument(Document document) {
        var meta = document.getMetadata();
        return new CitationDto(
                stringVal(meta.get("filePath")),
                intVal(meta.get("startLine")),
                intVal(meta.get("endLine")),
                stringVal(meta.get("language")));
    }
    private String stringVal(Object value) {
        return value == null ? null : value.toString();
    }

    private Integer intVal(Object value) {
        if (value instanceof Number number) {
            return number.intValue();
        }
        return null;
    }
    public String toJson(List<CitationDto> citations) {
        try {
            return jsonMapper.writeValueAsString(citations);
        } catch (JacksonException e) {
            return "[]";
        }
    }
//    public List<CitationDto> fromJson(String json) {
//        try {
//            return jsonMapper.readValue(
//                    json,
//                    jsonMapper.getTypeFactory()
//                            .constructCollectionType(List.class, CitationDto.class)
//            );
//        } catch (JacksonException e) {
//            return List.of();
//        }
//    }


    public List<CitationDto> fromJson(String json) {
        if (json == null || json.isBlank()) {
            return List.of();
        }

        try {
            List<CitationDto> citations = jsonMapper.readValue(
                    json,
                    jsonMapper.getTypeFactory()
                            .constructCollectionType(List.class, CitationDto.class)
            );

            return citations != null ? citations : List.of();

        } catch (JacksonException e) {
            return List.of();
        }
    }

}
