import openai
import os
from django.conf import settings
import json

# Use a demo mode if no API key is provided
DEMO_MODE = True  # Set to False when you have an OpenAI API key

def get_ai_suggestions(content, title=""):
    """Get AI-powered suggestions for a note"""
    if DEMO_MODE:
        return get_demo_suggestions(content, title)
    
    try:
        # In production, set your OpenAI API key in environment variables
        openai.api_key = os.getenv('OPENAI_API_KEY')
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant that analyzes notes and provides suggestions."},
                {"role": "user", "content": f"Analyze this note and provide suggestions:\n\nTitle: {title}\nContent: {content}"}
            ],
            max_tokens=500
        )
        
        return parse_ai_response(response.choices[0].message.content)
    except Exception as e:
        print(f"AI Service error: {e}")
        return get_demo_suggestions(content, title)

def get_demo_suggestions(content, title=""):
    """Demo AI suggestions without actual API calls"""
    content_lower = content.lower()
    title_lower = title.lower()
    
    # Smart category detection
    categories = []
    if any(word in content_lower for word in ['meeting', 'agenda', 'discuss', 'team']):
        categories.append('meeting')
    if any(word in content_lower for word in ['project', 'deadline', 'task', 'goal']):
        categories.append('work')
    if any(word in content_lower for word in ['idea', 'thought', 'brainstorm', 'concept']):
        categories.append('ideas')
    if any(word in content_lower for word in ['personal', 'life', 'family', 'hobby']):
        categories.append('personal')
    
    if not categories:
        categories = ['ideas']  # Default category
    
    # Generate summary
    sentences = content.split('.')[:3]  # First 3 sentences
    summary = '. '.join(sentences).strip()
    if summary and not summary.endswith('.'):
        summary += '.'
    
    # Smart enhancements
    enhancements = []
    if len(content) < 50:
        enhancements.append("Consider expanding this note with more details or examples.")
    if '?' in content:
        enhancements.append("This note contains questions - consider adding answers or action items.")
    if any(word in content_lower for word in ['todo', 'task', 'need to']):
        enhancements.append("This looks like a task - consider adding a deadline or priority level.")
    
    return {
        'suggested_categories': categories[:2],  # Top 2 suggestions
        'summary': summary or "Brief note about " + (title or "various topics"),
        'enhancements': enhancements[:2],  # Top 2 enhancements
        'ai_powered': True
    }

def enhance_note_content(content):
    """Enhance note content with AI suggestions"""
    if DEMO_MODE:
        return get_demo_enhancements(content)
    
    try:
        openai.api_key = os.getenv('OPENAI_API_KEY')
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a writing assistant. Improve the given text while maintaining its original meaning and style."},
                {"role": "user", "content": f"Improve this note content:\n\n{content}"}
            ],
            max_tokens=300
        )
        
        return {
            'enhanced_content': response.choices[0].message.content.strip(),
            'ai_powered': True
        }
    except Exception as e:
        print(f"AI Enhancement error: {e}")
        return get_demo_enhancements(content)

def get_demo_enhancements(content):
    """Demo content enhancement"""
    # Simple improvements
    enhanced = content
    
    # Basic grammar improvements
    enhanced = enhanced.replace(' i ', ' I ')
    enhanced = enhanced.replace(' im ', ' I\'m ')
    enhanced = enhanced.replace(' cant ', ' can\'t ')
    enhanced = enhanced.replace(' dont ', ' don\'t ')
    enhanced = enhanced.replace(' wont ', ' won\'t ')
    
    # Ensure proper sentence ending
    if enhanced and not enhanced.rstrip().endswith(('.', '!', '?')):
        enhanced = enhanced.rstrip() + '.'
    
    return {
        'enhanced_content': enhanced,
        'ai_powered': True,
        'improvements': ['Grammar corrections applied', 'Sentence structure improved']
    }

def generate_smart_title(content):
    """Generate a smart title from content"""
    if not content:
        return "Untitled Note"
    
    # Extract first meaningful sentence or phrase
    first_sentence = content.split('.')[0].strip()
    if len(first_sentence) > 50:
        words = first_sentence.split()[:8]
        return ' '.join(words) + '...'
    
    return first_sentence or "Quick Note" 