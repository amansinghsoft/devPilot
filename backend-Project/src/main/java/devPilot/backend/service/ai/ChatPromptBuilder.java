package devPilot.backend.service.ai;


import org.springframework.stereotype.Component;

@Component
public class ChatPromptBuilder {

    public String systemPrompt(String repositoryFullName) {
        return """
                You are DevPilot, an expert assistant for the %s codebase.
                Answer using ONLY the provided code context.
                If the context is insufficient, say you are unsure.
                Cite file paths and line ranges when relevant.
                Be concise and technical.
                """.formatted(repositoryFullName);
    }

    public String userPrompt(String codeContext, String question) {
        return """
                Code context:
                %s
                
                User question:
                %s
                """.formatted(codeContext, question);
    }

    /*
    *Builds the prompts sent to GEMINI
    *
    * <p>we use two message:
    * <ul>
    * <li><b>System</b> - rules for how the assistant should behave </li>
    * <li><b>User</b> - retrieved code context + actual question </li>
     */
}
