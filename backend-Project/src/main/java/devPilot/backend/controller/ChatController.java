package devPilot.backend.controller;


import devPilot.backend.dto.ChatMessageRequest;
import devPilot.backend.dto.ChatMessageResponse;
import devPilot.backend.dto.ChatSessionResponse;
import devPilot.backend.dto.CreateChatSessionRequest;
import devPilot.backend.security.CurrentUser;
import devPilot.backend.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final CurrentUser currentUser;
    private final ChatService chatService;

    @PostMapping("/sessions")
    public ResponseEntity<ChatSessionResponse> createSession(
            @Valid @RequestBody CreateChatSessionRequest request) {
        UUID userId = currentUser.required().getId();
        return ResponseEntity.ok(chatService.createSession(userId, request));
    }

//    @GetMapping("/sessions")
//    public List<ChatMessageResponse> listSession(@RequestParam UUID repositoryId){
//        UUID userId = currentUser.required().getId();
//        return chatService.getMessage(userId, repositoryId);
//    }

    @GetMapping("/sessions")
    public List<ChatSessionResponse> listSession(
            @RequestParam UUID repositoryId
    ) {
        UUID userId = currentUser.required().getId();
        return chatService.listSession(userId, repositoryId);
    }

    @GetMapping("/sessions/{id}")
    public List<ChatMessageResponse> getMessage(@PathVariable UUID id) {
        UUID userId = currentUser.required().getId();
        return chatService.getMessage(userId, id);
    }

    @PostMapping(value = "/sessions/{id}/messages", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter sendMessage(
            @PathVariable UUID id,
            @Valid @RequestBody ChatMessageRequest request){
        UUID userId = currentUser.required().getId();
        return chatService.streamReady(userId, id, request.content());
    }
}
