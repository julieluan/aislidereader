import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * Generate course outline from knowledge text using Claude
 *
 * @param {string} knowledgeText - The knowledge/content provided by teacher
 * @param {Array<string>} concepts - Required concepts to cover
 * @param {string} accessibility - Accessibility mode (ADHD, Dyslexia, General, Hearing)
 * @param {Array<string>} keywords - Optional keywords
 * @returns {Promise<{mermaid: string, items: Array}>} - Mermaid diagram and outline items
 */
export async function generateOutline(knowledgeText, concepts, accessibility, keywords = []) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('ANTHROPIC_API_KEY not set. Returning mock outline.');
      return getMockOutline(concepts);
    }

    const accessibilityGuidelines = {
      'ADHD': 'Use short, focused segments. Include frequent interaction points. Break complex topics into digestible chunks.',
      'Dyslexia': 'Use clear, simple language. Avoid long paragraphs. Focus on visual aids and audio support.',
      'General': 'Balanced approach with text and visuals. Standard educational pacing.',
      'Hearing': 'Emphasize visual content. Include comprehensive text descriptions. Add captions and diagrams.'
    };

    const prompt = `You are an expert educational content creator. Create a structured learning outline for ${accessibility} learners.

Guidelines for ${accessibility} learners:
${accessibilityGuidelines[accessibility] || accessibilityGuidelines.General}

Knowledge Content:
${knowledgeText}

Required Concepts to Cover:
${concepts.map((c, i) => `${i + 1}. ${c}`).join('\n')}

${keywords.length > 0 ? `Optional Keywords: ${keywords.join(', ')}` : ''}

Please generate:
1. A Mermaid.js mindmap diagram showing the topic hierarchy
2. A detailed outline with 5-8 main topics

Return your response as JSON with this exact structure:
{
  "mermaid": "mindmap\\n  root((Topic Name))\\n    Subtopic 1\\n      Detail A\\n      Detail B",
  "items": [
    {
      "id": "unique-id-1",
      "title": "Topic Title",
      "type": "core",
      "description": "Brief description",
      "order": 1
    }
  ]
}

Types can be: "core" (essential), "optional" (supplementary), "custom" (user-added)

Make sure all required concepts are covered as "core" topics.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = message.content[0].text;

    // Extract JSON from response (handle markdown code blocks)
    let jsonText = responseText;
    if (responseText.includes('```json')) {
      jsonText = responseText.match(/```json\n([\s\S]*?)\n```/)?.[1] || responseText;
    } else if (responseText.includes('```')) {
      jsonText = responseText.match(/```\n([\s\S]*?)\n```/)?.[1] || responseText;
    }

    const result = JSON.parse(jsonText);

    console.log(`Generated outline with ${result.items.length} items`);
    return result;
  } catch (error) {
    console.error('Outline generation error:', error);
    throw new Error(`Failed to generate outline: ${error.message}`);
  }
}

/**
 * Generate slides from outline using Claude
 *
 * @param {Array} outline - Array of outline items
 * @param {string} accessibility - Accessibility mode
 * @returns {Promise<Array>} - Array of slide objects
 */
export async function generateSlides(outline, accessibility) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('ANTHROPIC_API_KEY not set. Returning mock slides.');
      return getMockSlides(outline);
    }

    const accessibilityGuidelines = {
      'ADHD': 'Keep slides concise (3-4 bullets max). Use active language. Include engagement prompts.',
      'Dyslexia': 'Use simple, clear language. Short sentences. Bullet points over paragraphs.',
      'General': 'Standard educational format with 4-5 bullets per slide.',
      'Hearing': 'Comprehensive text. Detailed descriptions. Visual-heavy content.'
    };

    const prompt = `You are creating educational slides for ${accessibility} learners.

Guidelines:
${accessibilityGuidelines[accessibility] || accessibilityGuidelines.General}

Outline to Convert:
${JSON.stringify(outline, null, 2)}

For each outline item, create a slide with:
- Title (clear and concise)
- Concept (1 sentence summary)
- Bullets (3-5 key points, student-facing)
- Teacher Script (conversational teaching notes, 2-3 paragraphs)

Return JSON array of slides:
[
  {
    "slide_order": 1,
    "title": "Introduction to Topic",
    "concept": "One sentence explaining the core concept",
    "bullets": [
      { "id": "b1", "text": "First key point", "order": 1 },
      { "id": "b2", "text": "Second key point", "order": 2 }
    ],
    "teacher_script": "Conversational teaching notes...",
    "duration_seconds": 180
  }
]

Make the teacher script natural and engaging, as if speaking to students.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = message.content[0].text;

    // Extract JSON from response
    let jsonText = responseText;
    if (responseText.includes('```json')) {
      jsonText = responseText.match(/```json\n([\s\S]*?)\n```/)?.[1] || responseText;
    } else if (responseText.includes('```')) {
      jsonText = responseText.match(/```\n([\s\S]*?)\n```/)?.[1] || responseText;
    }

    const slides = JSON.parse(jsonText);

    console.log(`Generated ${slides.length} slides`);
    return slides;
  } catch (error) {
    console.error('Slide generation error:', error);
    throw new Error(`Failed to generate slides: ${error.message}`);
  }
}

// Mock data for testing without API key
function getMockOutline(concepts) {
  return {
    mermaid: `mindmap
  root((Learning Topic))
    ${concepts[0] || 'Concept 1'}
      Introduction
      Key Points
    ${concepts[1] || 'Concept 2'}
      Examples
      Practice`,
    items: concepts.map((concept, i) => ({
      id: `outline-${i + 1}`,
      title: concept,
      type: 'core',
      description: `Learn about ${concept}`,
      order: i + 1
    }))
  };
}

function getMockSlides(outline) {
  return outline.map((item, i) => ({
    slide_order: i + 1,
    title: item.title,
    concept: item.description || `Understanding ${item.title}`,
    bullets: [
      { id: `b${i}-1`, text: `Introduction to ${item.title}`, order: 1 },
      { id: `b${i}-2`, text: 'Key concepts and definitions', order: 2 },
      { id: `b${i}-3`, text: 'Practical applications', order: 3 }
    ],
    teacher_script: `Welcome to our discussion on ${item.title}. In this section, we'll explore the fundamental concepts and see how they apply in real-world scenarios. Let's dive in!`,
    duration_seconds: 180
  }));
}
