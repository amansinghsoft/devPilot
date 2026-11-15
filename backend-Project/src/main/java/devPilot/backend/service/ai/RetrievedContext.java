package devPilot.backend.service.ai;

import devPilot.backend.dto.CitationDto;

import java.util.List;

public record RetrievedContext(
        List<CitationDto> citations,
        String contextText) {
}
