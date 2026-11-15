package devPilot.backend.controller;



import devPilot.backend.dto.UserResponse;
import devPilot.backend.entity.User;
import devPilot.backend.security.AppUserPrincipal;
import devPilot.backend.security.CurrentUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final CurrentUser currentUser;

    @GetMapping("/login-url")
    public Map<String, String> loginUrl(){
        return Map.of("url", "/oauth2/authorization/github");
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(){
        AppUserPrincipal principal = currentUser.required();
        User user = principal.getUser();
        return ResponseEntity.ok(new UserResponse (
                user.getId(),
                user.getGithubId(),
                user.getGithubUserName(),
                user.getDisplayName(),
                user.getAvatarUrl()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {

        new SecurityContextLogoutHandler()
                .logout(request, response, authentication);

        return ResponseEntity.noContent().build();
    }
}
