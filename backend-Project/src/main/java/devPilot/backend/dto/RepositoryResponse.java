package devPilot.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import devPilot.backend.entity.IndexStatus;
import org.stringtemplate.v4.ST;

import java.time.Instant;
import java.util.UUID;

public record RepositoryResponse(
        UUID id,
        Long githubRepoId,
        String owner,
        String name,
        String fullName,
        @JsonProperty("isPrivate")boolean isPrivate,
        String defaultBranch,
        String language,
        String htmlUrl,
        String description,
        IndexStatus indexStatus,
        Instant indexAt,
        int chunkCount,
        int filesTotal,
        int filesProcessed,
        String errorMessage) {
}
