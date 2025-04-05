import { auth } from "@clerk/nextjs/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Parse request body
  const body = await request.json();
  const { content, action, modelId, options = {} } = body;
  
  if (!content) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }
  
  if (!action || !['shorten', 'expand', 'optimize', 'format'].includes(action)) {
    return NextResponse.json(
      { error: "Valid action is required (shorten, expand, optimize, format)" },
      { status: 400 }
    );
  }
  
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Fetch AI model configuration - use default if not specified
    let modelConfig;
    
    if (modelId) {
      const { data: modelData, error: modelError } = await supabase
        .from("ai_models")
        .select("*")
        .eq("id", modelId)
        .single();
      
      if (modelError) {
        throw new Error("Error fetching AI model configuration");
      }
      
      modelConfig = modelData;
    } else {
      const { data: defaultModelData, error: defaultModelError } = await supabase
        .from("ai_models")
        .select("*")
        .eq("is_default", true)
        .single();
      
      if (defaultModelError) {
        throw new Error("Error fetching default AI model configuration");
      }
      
      modelConfig = defaultModelData;
    }
    
    // In a real implementation, this would call the appropriate AI model API.
    // For now, we'll simulate AI-powered editing.
    
    let editedContent;
    
    switch (action) {
      case 'shorten':
        // Simulate shortening the content (remove some sentences, words)
        editedContent = content
          .split('. ')
          .filter((_: string, i: number) => i % 2 === 0)
          .join('. ');
        break;
        
      case 'expand':
        // Simulate expanding the content (add explanatory text)
        const sentences = content.split('. ');
        editedContent = sentences
          .map((sentence: string) => 
            `${sentence}. Furthermore, this point is critical because it provides context and depth to the overall message.`
          )
          .join(' ');
        break;
        
      case 'optimize':
        // Simulate SEO optimization (add keywords, improve structure)
        editedContent = `${content} [This content has been optimized for SEO with improved keyword density and semantic relevance.]`;
        break;
        
      case 'format':
        // Simulate formatting (add headings, bullet points, etc.)
        const paragraphs = content.split('\n\n');
        editedContent = `## ${paragraphs[0]}\n\n${paragraphs.slice(1).join('\n\n')}`;
        if (paragraphs.length > 2) {
          editedContent += '\n\n### Key Points:\n- Important takeaway 1\n- Critical insight 2\n- Strategic consideration 3';
        }
        break;
        
      default:
        editedContent = content;
    }
    
    // In a production environment, we would:
    // 1. Call the appropriate AI model API (OpenAI, Anthropic, Google AI, etc.)
    // 2. Process the API response
    // 3. Return the edited content
    
    return NextResponse.json({
      originalContent: content,
      editedContent,
      action,
      modelUsed: modelConfig.model_name,
      // Additional metadata
      timestamp: new Date().toISOString(),
      status: "success",
    });
  } catch (error) {
    console.error("AI edit error:", error);
    return NextResponse.json(
      { error: "Failed to edit content" },
      { status: 500 }
    );
  }
} 