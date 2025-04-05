/**
 * SEO Service for interacting with SEO-related APIs
 */

/**
 * Analyze keywords using YourText.guru integration
 */
export async function analyzeKeywords(data: {
  primaryKeyword: string;
  secondaryKeywords?: string[];
  language?: string;
}) {
  try {
    const response = await fetch("/api/seo/keyword-research", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze keywords");
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing keywords:", error);
    throw error;
  }
}

/**
 * Generate content structure based on keywords and semantic data
 */
export async function generateContentStructure(data: {
  keyword: string;
  secondaryKeywords?: string[];
  semanticData?: any;
  language?: string;
}) {
  try {
    const response = await fetch("/api/seo/content-structure", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to generate content structure");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating content structure:", error);
    throw error;
  }
}

/**
 * Generate content segments based on structure
 */
export async function generateContent(data: {
  contentStructure: any;
  keyword: string;
  semanticData?: any;
  language?: string;
}) {
  try {
    const response = await fetch("/api/seo/segment-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to generate content");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

/**
 * Perform semantic analysis on generated content
 */
export async function analyzeContent(data: {
  content: string;
  keyword: string;
  language?: string;
}) {
  try {
    const response = await fetch("/api/seo/semantic-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze content");
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing content:", error);
    throw error;
  }
}

/**
 * Apply AI-powered edits to content
 */
export async function editContentWithAI(data: {
  content: string;
  action: "shorten" | "expand" | "optimize" | "format";
  modelId?: string;
  options?: any;
}) {
  try {
    const response = await fetch("/api/seo/ai-edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to edit content");
    }

    return await response.json();
  } catch (error) {
    console.error("Error editing content:", error);
    throw error;
  }
} 