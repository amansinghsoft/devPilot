package devPilot.backend.service.ai;


import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CodeContextRetriever {

    private static final String NO_MATCH = "( no matching code chunks found)";

    private final VectorStore vectorStore;
    private final CitationMapper citationMapper;

    public RetrievedContext retrieve(UUID repoId, String question) {
        var filter = new FilterExpressionBuilder()
                .eq(RagSettings.METADATA_REPO_ID, repoId.toString())
                .build();

        var search = SearchRequest.builder()
                .query(question)
                .topK(RagSettings.TOP_K_CHUNKS)
                .filterExpression(filter)
                .build();

        var documents = vectorStore.similaritySearch(search);

        var citations = documents.stream()
                .map(citationMapper::formDocument)
                .distinct()
                .toList();

        var contextText = documents.stream()
                .map(Document::getText)
                .collect(Collectors.joining("\n\n---\n\n"));

        if (contextText.isBlank()) {
            contextText = NO_MATCH;
        }
        return new RetrievedContext(citations, contextText);
    }
}
