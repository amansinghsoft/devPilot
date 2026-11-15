
package devPilot.backend.dto;

import java.util.UUID;

public record UserResponse(
        UUID id,
        String githubId,
        String githubUsername,
        String displayName,
        String avatarUrl
) {
    public UserResponse(
            UUID id,
            Long githubId,
            String githubUsername,
            String displayName,
            String avatarUrl
    ) {
        this(
                id,
                githubId != null ? githubId.toString() : null,
                githubUsername,
                displayName,
                avatarUrl
        );
    }
}
